const axios = require('axios')
const parseCsv = require('csvtojson')

const GLOBAL_VARIABLE_PATTERN = /^\$([A-Z0-9_]+)$/
const GLOBAL_VARIABLES_SEARCH_PATTERN = /%[A-Z0-9_]+?%/g

// Columns: 0 - date, 1 - status, 2 - key, 3 - default message, 4 and all next - translations
const COLUMNS_INDICES = {
  KEY: 2,
  DEFAULT: 3
}

module.exports = async function loadTranslations (url = '', options = {}) {
  const csvString = await axios.get(url, options.axiosConfig || {}).then(response => (response || {}).data || '')
  const csvRows = await parseCsv({noheader: true, output: 'csv'}).fromString(csvString) || []

  const languagesIndices = {}
  const translations = {}

  // A list of translation keys we keep default translations for
  const keepDefaultTranslationsFor = options.keepDefaultTranslationsFor
  // Keep all default translations if the list (`keepDefaultTranslationsFor`) is not provided
  const keepAllDefaultTranslations = typeof keepDefaultTranslationsFor === 'undefined'

  // Conversion CSV into translations object
  csvRows.forEach((csvRow = [], i) => {
    // First row is the header
    if (i === 0) {
      retrieveLanguages(csvRow, (language, i) => {
        languagesIndices[language] = i
        translations[language] = {}
      })
    } else {
      retrieveTranslation(csvRow, languagesIndices, (language, key, translation, {
        isDefault
      }) => {
        const keepDefaultTranslation = keepAllDefaultTranslations || keepDefaultTranslationsFor.includes(key)
        // It is possible to skip translations which are matched with the default ones (e.g. if the default
        // translations exist in the code already)
        if (!isDefault || keepDefaultTranslation) {
          // Populate translations
          translations[language][key] = translation
        }
      })
    }
  })

  return translations
}

function retrieveLanguages (headerRow = [], onRetrievingNewLanguage = () => {}) {
  // Validate headers
  if (headerRow[COLUMNS_INDICES.DEFAULT] !== 'default') {
    throw new Error('Cannot retrieve languages: header row is not valid.')
  }

  headerRow.forEach((language, i) => {
    if (i > COLUMNS_INDICES.DEFAULT && language) {
      onRetrievingNewLanguage(language, i)
    }
  })
}

function retrieveTranslation (row = [], languagesIndices = {}, onRetrievingNewTranslation = () => {}) {
  const key = row[COLUMNS_INDICES.KEY]
  const defaultTranslation = row[COLUMNS_INDICES.DEFAULT]

  if (!key || !defaultTranslation) {
    // Skip inappropriate row
    return
  }

  const englishTranslation = row[languagesIndices['en']] || defaultTranslation

  for (const language in languagesIndices) {
    // Translation fallback: '<language>' <- 'en'
    const translation = row[languagesIndices[language]] || englishTranslation
    const isDefault = translation === defaultTranslation
    const globalVariableName = (key.match(GLOBAL_VARIABLE_PATTERN) || [])[1] || undefined
    const isGlobalVariable = !!globalVariableName
    const hasGlobalVariable = GLOBAL_VARIABLES_SEARCH_PATTERN.test(translation)

    onRetrievingNewTranslation(language, key, formatTranslation(translation), {
      isDefault,
      isGlobalVariable,
      globalVariableName,
      hasGlobalVariable,
      defaultTranslation
    })
  }
}

function formatTranslation (translation = '') {
  return translation === '<EMPTY>' ? ' ' : '' + translation
}
