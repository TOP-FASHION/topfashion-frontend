// The idea is to extend CMS functionality to return appropriate file according to some rules (folder configuration).
//
// Example of the rules:
// -------------------------------------------------------------
//   [
//     {"file": "sv.html", "language":  "sv"},
//     {"file": "fi.html", "language":  "fi"},
//     {"file": "en.html"}
//   ]
// -------------------------------------------------------------
//
// This tells CMS to return file "sv.html" in case of the request contains "?language=sv" parameter or
// return file "fi.html" in case of the request contains "?language=fi" parameter or
// return "en.html" (if the previous rules haven’t been applied).
//
// Similar logic but on Javascript:
// -------------------------------------------------------------
//   if (language === 'sv') {
//     return 'sv.html'
//   }
//   if (language === 'fi') {
//     return 'fi.html'
//   }
//   return 'en.html'
// -------------------------------------------------------------
//
// The file should be placed in a CMS folder (e.g. "/public/pages/about-us/$.json") and if CMS middleware found it
// in the structure then it will follow the rules to serve files inside the folder
// (e.g. HTTP request "/cms/pages/about-us?language=fi" will return content of the "fi.html" file).
//
// The rules may contain any number and types of parameters (country, device, browser, etc.).

const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const glob = require('glob')
const {default: refreshableData} = require('../../../utils/refreshableData')
const cmsBasic = require('./cmsBasic')

const globAsync = promisify(glob)
const readFileAsync = promisify(fs.readFile)

const FOLDER_CONFIG_FILENAME = '$.json'
const FOLDER_CONFIG_TTL_DEFAULT_SEC = 5 * 60 // 5 minutes
const FOLDER_CONFIG_RETRYING_ON_ERROR_SEC = 60 // 1 minute

// MAIN

module.exports = (root, options = {}) => {
  root = path.resolve(root)

  const maxAgeParsed = parseFloat(options.maxAge)
  const maxAge = !isNaN(maxAgeParsed) ? maxAgeParsed : 0
  const folderConfigTtlParsed = parseFloat(options.folderConfigTtl)
  const folderConfigTtl = !isNaN(folderConfigTtlParsed) ? folderConfigTtlParsed : FOLDER_CONFIG_TTL_DEFAULT_SEC
  const debugMode = !!options.debugMode

  // Run auto-fetcher of the folder configurations
  const getFolderConfigs = refreshableData(folderConfigsFetcher, {
    initiallyOutdated: true,
    autoRefresh: true,
    retryingDelaySec: FOLDER_CONFIG_RETRYING_ON_ERROR_SEC,
    ttlSec: folderConfigTtl,
    initialData: {},
    debugMode
  })

  const initiallyAwaitingPromises = [
    getFolderConfigs.ongoingFetch
  ]

  const cmsBasicMiddleware = cmsBasic(root, {maxAge})

  return waitingMiddleware

  // FUNCTIONS

  async function waitingMiddleware (req, res, next) {
    try {
      await Promise.all(initiallyAwaitingPromises)
      return cmsMiddleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  async function cmsMiddleware (req, res, next) {
    const folderConfigs = getFolderConfigs()
    const pathRequested = path.join(root, req.path)
    const extension = path.extname(pathRequested)
    const extensionName = extension.slice(1)
    const extensionNameResolved = extensionName || req.query.extension || ''
    const folderToCheck = extension ? pathRequested.slice(0, -extension.length) : pathRequested
    const folderConfig = folderConfigs[folderToCheck]

    // Use folder configuration to resolve returned file
    if (folderConfig) {
      if (folderConfig instanceof Error) {
        next(folderConfig)
        return
      }

      const appliedFile = getAppliedFile()

      if (appliedFile) {
        sendFile(appliedFile)
        return
      }

      const folderConfigFile = path.join(folderToCheck, FOLDER_CONFIG_FILENAME)
      next(`Folder configuration is defined but no conditions are fulfilled (${folderConfigFile}).`)
      return
    }

    // Pass through the initial version of the CMS
    cmsBasicMiddleware(req, res, next)

    // FUNCTIONS

    // Find appropriate file according to the folder configuration
    function getAppliedFile () {
      for (let i = 0, l = folderConfig.length; i < l; i++) {
        const rule = folderConfig[i]
        const appliedRule = isRuleApplied(rule)

        if (appliedRule) {
          const appliedFile = path.join(folderToCheck, rule.file)
          return appliedFile
        }
      }

      return null
    }

    function isRuleApplied (rule) {
      let appliedRule = true

      for (const ruleProperty in rule) {
        // Skip "file" property
        if (ruleProperty === 'file') {
          continue
        }

        const rulePropertyValue = rule[ruleProperty]

        // Check "extension" property
        if (ruleProperty === 'extension') {
          if (rulePropertyValue !== extensionNameResolved) {
            appliedRule = false
            break
          }
          continue
        }

        // Check other properties
        if (rulePropertyValue !== req.query[ruleProperty]) {
          appliedRule = false
          break
        }
      }

      return appliedRule
    }

    function sendFile (path) {
      res.sendFile(path, {maxAge}, error => {
        if (error) {
          next(error)
        }
      })
    }
  }

  // Search and collect folders configurations
  async function folderConfigsFetcher () {
    const globOptions = {
      root,
      nodir: true
    }

    // Search "$.json" files
    const folderConfigFiles = await globAsync(`/**/${FOLDER_CONFIG_FILENAME}`, globOptions)
    const folderConfigPromises = []
    const folderConfigs = {}

    // Read, normalize and validate each folder configuration
    folderConfigFiles.forEach(folderConfigFile => {
      const folder = path.dirname(folderConfigFile)

      const folderConfigPromise = readFileAsync(folderConfigFile, 'utf8')
        .then(folderConfigRaw => {
          const folderConfig = JSON.parse(folderConfigRaw)
          const folderConfigNormalized = normalizeFolderConfig(folderConfig)

          if (!folderConfigNormalized) {
            throw new Error(`Invalid folder configuration (${folderConfigFile}).`)
          }

          folderConfigs[folder] = folderConfigNormalized
        })
        .catch(() => {
          folderConfigs[folder] = new Error(`Folder configuration issue (${folderConfigFile}).`)
        })

      folderConfigPromises.push(folderConfigPromise)
    })

    await Promise.all(folderConfigPromises)
    return folderConfigs
  }
}

// UTILS

function normalizeFolderConfig (folderConfig) {
  const folderConfigNormalized = []

  if (Array.isArray(folderConfig)) {
    folderConfig.forEach(rule => {
      const ruleNormalized = normalizeRule(rule)

      if (ruleNormalized) {
        folderConfigNormalized.push(ruleNormalized)
      }
    })
  }

  if (folderConfigNormalized.length) {
    return folderConfigNormalized
  }
  return null
}

function normalizeRule (rule) {
  if (typeof rule !== 'object' || rule === null) {
    return null
  }

  const ruleFileNormalized = normalizeRuleFile(rule.file)
  if (!ruleFileNormalized) {
    return null
  }

  const ruleNormalized = {
    ...rule,
    file: ruleFileNormalized
  }

  return ruleNormalized
}

function normalizeRuleFile (file) {
  if (typeof file === 'string') {
    // Normalize path and prevent access to the parent folder ("../")
    const fileNormalized = path.join('/', file)
    const filename = path.basename(fileNormalized)

    // Do not return configuration file itself
    if (filename !== FOLDER_CONFIG_FILENAME) {
      return fileNormalized
    }
  }
  return ''
}
