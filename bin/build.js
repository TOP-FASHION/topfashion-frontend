const path = require('path')
const ora = require('ora')
const fse = require('fs-extra')
const shell = require('shelljs')

// Constants
const buildFolder = '_build_prod'
const basePath = path.resolve(__dirname, '..')
const buildPath = path.resolve(basePath, buildFolder)

// Run steps
start()
  .then(removeBuildFolder)
  .then(buildLibrary)
  .then(copyStaticFiles)
  .then(createPackageJson)
  .catch(catchError)

//
// STEPS
//

function removeBuildFolder () {
  return log(`Removing build folder (./${buildFolder})`, (resolve, reject) => {
    removeFolder(buildPath, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

function buildLibrary () {
  return log(`Building application (./${buildFolder})`, (resolve, reject) => {
    runCmd(`webpack --config webpack/client.prod.js`, err => {
      if (err) {
        reject(err)
        return
      }
      runCmd(`webpack --config webpack/server.prod.js`, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  })
}

function copyStaticFiles () {
  return log(`Copying static files`, (resolve, reject) => {
    shell.cp('bin/server.prod.js', '_build_prod/')
    shell.mv('_build_prod/server.prod.js', '_build_prod/index.js')
    shell.cp('-R', 'src/server/static', '_build_prod/server')
    shell.cp('-R', 'src/client/assets', '_build_prod/client')
    shell.cp('-R', 'package-lock.json', '_build_prod')
    shell.cp('-R', 'README.md', '_build_prod')
    shell.cp('-R', 'LICENSE', '_build_prod')

    return resolve()
  })
}

function createPackageJson () {
  return log(`Creating package.json for publication`, (resolve, reject) => {
    getPackageObj((err, packageObj) => {
      if (err) {
        reject(err)
        return
      }

      const {
        name,
        version,
        description,
        keywords,
        author,
        license,
        bugs,
        homepage,
        repository,
        publishConfig,
        peerDependencies,
        dependencies
      } = packageObj

      const buildPackageJsonData = JSON.stringify({
        name,
        version,
        description,
        keywords,
        author,
        license,
        bugs,
        homepage,
        repository,
        publishConfig,
        main: `index.js`,
        bin: {
          'pokemon-app': 'index.js'
        },
        peerDependencies,
        scripts: {
          start: 'cross-env PUBLIC_PATH=client/assets STATIC_PATH=server/static NODE_ENV=production node index.js'
        },
        dependencies
      }, null, 2)

      const buildPackageJsonPath = path.resolve(buildPath, 'package.json')
      createFile(buildPackageJsonPath, buildPackageJsonData, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  })
}

//
// UTILS
//

function removeFolder (folderPath, callback) {
  fse.remove(folderPath, callback)
}

function runCmd (cmd, callback, options = {}) {
  options = {
    // Warning! If the "env" setting is defined then global environment variables aren't used.
    cwd: basePath,
    ...options
  }
  shell.exec(cmd, options, (err, stdout = '') => {
    if (err) {
      callback(err)
      return
    }
    callback(null, stdout.trim())
  })
}

function createFile (filePath, fileData, callback) {
  fse.writeFile(filePath, fileData, callback)
}

function getPackageObj (callback) {
  const packageJsonPath = path.resolve(basePath, 'package.json')
  fse.readJson(packageJsonPath, (err, packageObj) => {
    if (err) {
      callback(err)
      return
    }
    callback(null, packageObj)
  })
}

function log (message, callback) {
  const promise = new Promise(callback)
  ora.promise(promise, message)
  return promise
}

function start (...args) {
  return Promise.resolve(...args)
}

function catchError (error = {}) {
  console.error(`ERROR\n${error.message || error}\n`)
  process.exit(1)
}
