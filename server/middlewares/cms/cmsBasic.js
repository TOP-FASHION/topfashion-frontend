const path = require('path')
const fs = require('fs')

module.exports = (root, options = {}) => {
  root = path.resolve(root)

  const sendFileOptions = {
    maxAge: 0,
    ...options
  }

  const defaultLanguage = 'en'

  return (req, res, next) => {
    const filepath = path.join(root, req.path)
    const extension = (filepath.match(/\.[^/]*$/) || [])[0] || ''

    // Throw error if extension is missing
    if (!extension) {
      next(`Error: '${filepath}' is not supported, current version of CMS works on files with extensions only.`)
      return
    }

    // Check file stats (e.g. /cms/file.html)
    fs.stat(filepath, (err1, stats) => {
      // Is file
      if (!err1 && stats.isFile()) {
        sendFile(filepath)
        return
      }
      // Is directory
      if (!err1 && stats.isDirectory()) {
        next(`Error: '${filepath}' is directory.`)
        return
      }

      const folderpath = filepath.slice(0, -extension.length)

      // Check directory stats (e.g. /cms/file/)
      fs.stat(folderpath, (err2, stats) => {
        // Is directory
        if (!err2 && stats.isDirectory()) {
          const language = req.query.language || req.query.lang || req.cookies._lang || defaultLanguage
          const filepathWithLanguageDefault = `${folderpath}/${defaultLanguage}${extension}`

          if (language === defaultLanguage) {
            // Send file by default language (e.g. /cms/file/en.html)
            sendFile(filepathWithLanguageDefault)
            return
          }

          const filepathWithLanguage = `${folderpath}/${language}${extension}`

          // Check file by language stats (e.g. /cms/file/ru.html)
          fs.stat(filepathWithLanguage, (err3, stats) => {
            // Is file
            if (!err3 && stats.isFile()) {
              sendFile(filepathWithLanguage)
              return
            }

            // Send file by default language (e.g. /cms/file/en.html)
            sendFile(filepathWithLanguageDefault)
          })
          return
        }

        // Return the first error
        next(err1)
      })
    })

    function sendFile (path) {
      res.sendFile(path, sendFileOptions, err => {
        if (err) {
          next(err)
        }
      })
    }
  }
}
