#!/usr/bin/env node

// Script for managing translations

const fs = require('fs');
const path = require('path');
const ora = require('ora');
const fse = require('fs-extra');
const { exec } = require('child_process');
const {
  readMessageFiles,
  getDefaultMessages,
} = require('react-intl-translations-manager');
const { google } = require('googleapis');
const chalk = require('chalk');
const out = require('cli-output');

//
// SETTINGS
//

const googleCredentials = {
  type: 'service_account',
  project_id: 'test-translations-252615',
  private_key_id: 'a0d983a4a3100e52e9689b6a01577d2e35d0a5e9',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCT53TgkeFgVLYp\nbMi8GCelXST3XYReLkcddsuUOkz+V4rVJ0o8F9cxh9GCpq+G04l4UmunyCwiIPKv\nA/vtIfrUE2afcWuMZUL/kahy74H64l09DYjE0eRTSFV2S2I9Nb7YEkh+adFLN1sP\nPR9mxSWkMQCa7A3nV8Zeuqy0Cex/2FtbZcACMlmquHVs9iCu5nvg2at6leOXlLYR\nHgb3kF84dq7QDz62U+nq8tvuR8vwKk2YEfGbXlYPKs8N72HMag4sCzx0GJcBYbxp\nn41PyF2YNCrcrxMtpNipLnbubXkxtUX692uOmq97Inohm7LAqEvGK73hruvTBQ2m\nJkCUgMVXAgMBAAECggEAEnqMg7I2Mk7jI3HP8pAiA+sLP0yTySCHCgtZi/9stypA\n0jjCcZeY7ztE1cn1jCbJuhqyEJhVyz3KlEsvIoVoTS7PV4RYJ4ZPRJbyMMnzt2Co\nvYP/XnfKywzygIESmQsp+Nzv6btWxsr3uYOtdK2U8lqc9L4hTpIM2rD/+s5ymdZB\neGH7KU3lbS9pQKMUfyesg25Zc8LEKb03S805JDEg43zeEPI58o9lwfQ/11sD1/8I\nQ+x2hukwNjY9gUXpPBXEuM4SPN3sDD4PxweJqcY+dmSQJFIAy4+KwfMiGXTHgTYe\nD+aEr+s0DkQ0f8vYcJxvKs4NxAYC/UDD4qMWyj39gQKBgQDQE5BFUTXN97JlomyA\ng2CwOUUZGTp41y+i6f8okGGpcIw9OO/XzYeFy0czPLBMEZHQerESoJw75Qvm4k9w\nOZGz3SGmEoNRLalmx837WZpbjvowE6DqrubEXEXTJEbJu15qkTf6sxtcol/ofgyj\n3VnAABFUYUQZUkQ6tblE6NoxRwKBgQC1+A/lpBJ4l/v7B46XuJYQV1OjMpPSaU8o\nIZoGQNfCRIv5WZVegXS2nyuKUPSR6MLATiEjaFITLgvIC4CZl+D07acVuf8LuyRi\n+sIqfr/SXixkzz3FhdxFhyDKakOrZefTWJinTs6c9kQrts609Gmw8NX8YijSJpeE\nq2yQM5FTcQKBgBmIbQm0f2+413FVTw8uD+1P+cSsrdoqPbQ2FpN5tCJAp1TT6cqH\nc/vdB+2notKSzVvR0mzAvKs03hME7k6NIe36Uqi4WNjbS5BLMGGJi0F0+ApyPirO\nL48k64SPTQhwL5PQIhhnZhIl8rLq1M4+2UaQO5ApJ1wcFjdGGWf1UuD9AoGAbT3u\nzT4imKMlcx6mTA9Uh5rlayQB+l+eVclWXkqvPMFKBvfw5Dtzhe8ohHD1YmMKB8jf\nvBH0s+8Aw6ekHJFBS8kgdbqjkrdWsNU5m6lcHz7KB/siamJiSptE5D/HQC59bjPR\n8R8uiqyNYHDux1Oz37W1wT5sozzn2Y3QLwHGTQECgYEAp1TiR2bhiCJihj94F47M\ngrD5XoIN0txJQpTRortg91VkzCQg16K8DmkCbUmRyVJBVzdKWnFLI5oDL3Ti3Fcu\n61ccYzqXmEQqjOBiD04Qgu6Fu4m37xaPcQq2Oo4jG+0WPgZ+LfE32ksI6J5YRWb4\nI6QvB4oOlvjrb3zn7dz3JKY=\n-----END PRIVATE KEY-----\n',
  client_email: 'translations@test-translations-252615.iam.gserviceaccount.com',
  client_id: '109041161182207098661',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/translations%40test-translations-252615.iam.gserviceaccount.com',
};
const googleSheetId = 0;
const googleSheetName = 'ALL';
const googleBackupSheetId = 999;
const googleLastColumnName = 'ZZZ';
const daysToKeepStatus = 30;

const [
  updatedColumnIndex,
  statusColumnIndex,
  keyColumnIndex,
  defaultTranslationColumnIndex,
] = [0, 1, 2, 3];

const color = {
  white: {
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
  },
  green: {
    red: 0.85,
    green: 0.92,
    blue: 0.83,
    alpha: 1,
  },
  yellow: {
    red: 1,
    green: 0.95,
    blue: 0.8,
    alpha: 1,
  },
  grey: {
    red: 0.94,
    green: 0.94,
    blue: 0.94,
    alpha: 1,
  },
};

const statusColor = {
  new: 'green',
  added: 'green',
  updated: 'yellow',
  deleted: 'grey',
  restored: 'yellow',
};

//
// MAIN
//

run().catch(catchError);

async function run() {
  const args = getScriptArgs();
  const basePath = path.resolve(__dirname, '..');
  const extractedMessagesDirectory = getExtractedMessagesDirectory(basePath);
  const extractedMessagesPath = path.resolve(
    basePath,
    extractedMessagesDirectory
  );
  const googleSpreadsheetId = '1jn21cKNzuUqmeu3KHlrQClQaEpkvZc7VO01SVHRshxI';

  // Import
  if (args.import) {
    if (args.help) {
      displayHelpImport();
      return;
    }

    await logAsync(`Authorization in Google API`, authorizeInApi());
    await logAsync(`Spread sheet To Json`, spreadsheetToJson());

    return;
  }

  // Export
  if (args.export) {
    if (args.help) {
      displayHelpExport();
      return;
    }
    // TODO need to fix for window os
    await logAsync(`Preparing`, prepareScriptToRun());
    await logAsync(
      `Extracting messages (${extractedMessagesDirectory})`,
      extractMessages()
    );
    const messages = await logAsync(`Reading messages`, readMessages());
    await logAsync(`Authorization in Google API`, authorizeInApi());
    const spreadsheetProps = await logAsync(
      `Reading spreadsheet properties`,
      readSpreadsheetProps()
    );

    let report;

    if (args.publish) {
      await logAsync(`Making data backup`, backupSpreadsheet());
      // TODO: block sheet before updating
      report = await logAsync(
        `Exporting messages (${getSpreadsheetTitle(spreadsheetProps)})`,
        exportToSpreadsheet(messages)
      );
      await logAsync(`Formatting data`, formatSpreadsheetData());
      await logAsync(`Removing data backup`, removeSpreadsheetBackup());
    } else {
      report = await logAsync(
        `Reading messages (${getSpreadsheetTitle(spreadsheetProps)})`,
        exportToSpreadsheet(messages, true)
      );
    }

    displayExportingReport(report);

    return;
  }

  // TODO: restore backups

  displayHelp();

  // STEPS

  async function prepareScriptToRun() {
    // Validate path before the cleaning
    if (
      !extractedMessagesPath.startsWith(basePath) ||
      extractedMessagesPath === basePath
    ) {
      throw new Error(`Path for the extracted messages isn't safe.`);
    }

    await fse.remove(extractedMessagesPath);
    await runCmd(`npm install`, { cwd: basePath });
  }

  async function extractMessages() {
    await runCmd(`webpack --config webpack/dev.client.js`, { cwd: basePath });
  }

  async function readMessages() {
    const { messages: messagesObj, duplicateIds } = await getDefaultMessages(
      readMessageFiles(extractedMessagesPath)
    );

    if (!messagesObj || !Object.keys(messagesObj).length) {
      throw new Error(`Messages not found.`);
    }
    if (duplicateIds && duplicateIds.length) {
      throw new Error(`Found duplicated keys:\n${duplicateIds.join('\n')}`);
    }
    return messagesObj;
  }

  async function authorizeInApi() {
    const auth = await google.auth.getClient({
      credentials: googleCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    google.options({ auth });
  }

  async function readSpreadsheetProps(options = {}) {
    const hasDataFilters = (options.resource || {}).hasOwnProperty(
      'dataFilters'
    );
    const props = await spreadsheetManager(
      hasDataFilters ? 'getByDataFilter' : 'get',
      options
    );

    if (!props) {
      throw new Error(`Cannot read spreadsheet properties.`);
    }
    return props; // Spreadsheet
  }

  async function backupSpreadsheet() {
    await spreadsheetManager('batchUpdate', {
      resource: {
        requests: [
          {
            duplicateSheet: {
              sourceSheetId: googleSheetId,
              insertSheetIndex: googleSheetId + 1,
              newSheetId: googleBackupSheetId,
              newSheetName: `${googleSheetName}-${getDatetime(true)}`,
            },
          },
        ],
      },
    });
  }

  async function exportToSpreadsheet(messages, dryRun = false) {
    if (!messages || !Object.keys(messages).length) {
      throw new Error(`Messages not found.`);
    }

    const report = {
      added: [],
      updated: [],
      deleted: [],
      restored: [],
    };

    // Get spreadsheet data
    const rows = await readSpreadsheetRowsValues({
      range: `${googleSheetName}!A2:${googleLastColumnName}`,
    });

    const uniqueKeys = new Set();

    // Update rows
    for (let i = 0, l = rows.length; i < l; i++) {
      const row = rows[i];
      const [date, status, key, translation] = row;

      // Remove duplicates
      if (uniqueKeys.has(key)) {
        rows.splice(i, 1);
        i--;
        l--;
        continue;
      }

      uniqueKeys.add(key);

      // Deleted
      if (!messages.hasOwnProperty(key)) {
        // Skip already deleted files
        if (status !== 'deleted') {
          row[updatedColumnIndex] = getDatetime();
          row[statusColumnIndex] = 'deleted';
          report.deleted.push(key);
        }
        continue;
      }
      // Changed
      if (translation !== messages[key]) {
        row[updatedColumnIndex] = getDatetime();
        row[statusColumnIndex] = 'updated';
        row[defaultTranslationColumnIndex] = messages[key];
        report.updated.push(key);
        continue;
      }
      // Restored
      if (status === 'deleted') {
        row[updatedColumnIndex] = getDatetime();
        row[statusColumnIndex] = 'restored';
        report.restored.push(key);
        continue;
      }
      // Others
      if (status !== '' && getDatesDiff(date, 'd') >= daysToKeepStatus) {
        // Reset status
        row[statusColumnIndex] = '';
      }
    }

    // Add new keys
    for (const key in messages) {
      if (messages.hasOwnProperty(key) && !uniqueKeys.has(key)) {
        rows.push([getDatetime(), 'added', key, messages[key]]);
        uniqueKeys.add(key);
        report.added.push(key);
      }
    }

    if (!dryRun) {
      // Clear spreadsheet data
      await spreadsheetManager('batchUpdate', {
        resource: {
          requests: [
            {
              deleteRange: {
                range: {
                  sheetId: googleSheetId,
                  startRowIndex: 1,
                  startColumnIndex: 0,
                },
                shiftDimension: 'ROWS',
              },
            },
          ],
        },
      });

      // Update spreadsheet data
      await spreadsheetManager('values.append', {
        range: `${googleSheetName}!A2:${googleLastColumnName}`,
        valueInputOption: 'RAW',
        insertDataOption: 'OVERWRITE',
        resource: {
          majorDimension: 'ROWS',
          values: rows,
        },
      });
    }

    return report;
  }

  async function formatSpreadsheetData() {
    const formattingRange = {
      sheetId: googleSheetId,
      startRowIndex: 1,
      startColumnIndex: 0,
    };

    // Sort spreadsheet data
    await spreadsheetManager('batchUpdate', {
      resource: {
        requests: [
          {
            sortRange: {
              range: formattingRange,
              sortSpecs: [
                {
                  dimensionIndex: keyColumnIndex,
                  sortOrder: 'ASCENDING',
                },
              ],
            },
          },
        ],
      },
    });

    const columnsNumber = await readSpreadsheetColumnsNumber();

    // Limit columns number to speed up data retrieving
    formattingRange.endColumnIndex = columnsNumber;

    // Read spreadsheet rows
    // (take data from the first sheet and the first grid because of the selected formatting range)
    const { sheets: [sheet = {}] = [] } = await readSpreadsheetProps({
      resource: {
        dataFilters: [
          {
            gridRange: formattingRange,
          },
        ],
      },
      // Take only necessary data to speed up data retrieving (Spreadsheet is the root)
      fields: 'sheets(data(rowData(values)))',
    });
    const { data: [grid = {}] = [] } = sheet; // Sheet
    const { rowData: rows = [] } = grid; // GridData

    // Format spreadsheet data
    rows.forEach((row = {}) => {
      const { values: cells = [] } = row; // RowData

      // Get status of the message
      const { userEnteredValue = {} } = cells[statusColumnIndex] || {}; // CellData
      const { stringValue: status = '' } = userEnteredValue; // ExtendedValue
      // Define color for the row
      const backgroundColor = color[statusColor[status] || 'white'];

      // Update cells format (with appending the missing cells)
      for (let i = 0; i < columnsNumber; i++) {
        const cell = cells[i] || {}; // CellData
        cell.userEnteredFormat = {
          backgroundColor,
          wrapStrategy: 'WRAP',
          hyperlinkDisplayType: 'PLAIN_TEXT',
        };
        cells[i] = cell;
      }
    });

    // Upload the formatting
    await spreadsheetManager('batchUpdate', {
      resource: {
        requests: [
          {
            updateCells: {
              rows,
              range: formattingRange,
              // Update only allowed properties to prevent mistakes (CellData is the root)
              fields:
                'userEnteredFormat(backgroundColor,wrapStrategy,hyperlinkDisplayType)',
            },
          },
        ],
      },
    });
  }

  async function removeSpreadsheetBackup() {
    await spreadsheetManager('batchUpdate', {
      resource: {
        requests: [
          {
            deleteSheet: {
              sheetId: googleBackupSheetId,
            },
          },
        ],
      },
    });
  }

  async function readSpreadsheetColumnsNumber(options = {}) {
    const row = await readSpreadsheetColumns(options);
    return row.length;
  }

  async function readSpreadsheetColumns(options = {}) {
    // Get first row only
    const [row = []] = await readSpreadsheetRowsValues({
      range: `${googleSheetName}!A1:${googleLastColumnName}1`,
      ...options,
    });
    return row;
  }

  async function readSpreadsheetRowsValues(options = {}) {
    const { values: rows = [] } = await spreadsheetManager('values.get', {
      majorDimension: 'ROWS',
      valueRenderOption: 'UNFORMATTED_VALUE',
      ...options,
    });
    return rows; // ValueRange
  }

  async function spreadsheetToJson() {
    // Get spreadsheet data
    const rows = readSpreadsheetRowsValues({
      range: `${googleSheetName}!c2:${googleLastColumnName}`,
    });

    const columnsAcceptor = await readSpreadsheetColumns();
    const mergingLanguages = columnsAcceptor.slice(2);

    return rows
      .then(function (results) {
        const finalList = results.map(function (allCells) {
          return cellsToJson(allCells, mergingLanguages);
        });
        return finalList;
      })
      .then(function (result) {
        result = result.reduce((acc, x) => acc.concat(x), []);

        const contents = {};
        result.forEach(function (item, index) {
          const currentIdx = item.key || item.Key;
          Object.keys(item)
            .filter((k) => k.toLowerCase() !== 'key')
            .forEach(function (key) {
              if (!contents.hasOwnProperty(key)) {
                contents[key] = {};
              }
              contents[key][currentIdx] = item[key];
            });
        });
        return contents;
      })
      .then(function (result) {
        if (!fs.existsSync('./src/client/translations/locales')) {
          fs.mkdirSync('./src/client/translations/locales');
        }

        Object.keys(result).forEach(function (value) {
          const content = JSON.stringify(result[value], null, null);
          const extension = '.json';
          const file = `${
            './src/client/translations/locales' + '/'
          }${value}${extension}`;

          if (!fs.existsSync(file)) {
            return fs.writeFile(file, content, (err) => {
              if (err) throw err;
              out.info(`Creating ${file}`);
            });
          }
          return fs.writeFile(file, content, (err) => {
            if (err) throw err;
            out.info(`Updating ${file}`);
          });
        });
      })
      .catch(function (error) {
        out.error(error);
      });
  }

  // google spreadsheet cells into json
  function cellsToJson(allCells, options) {
    const newObject = {};

    allCells.forEach(function (cell, index) {
      setPropertyTree(newObject, options[index], cell);
    });

    return newObject;
  }

  function setPropertyTree(object, tree, value) {
    if (!Array.isArray(tree)) tree = [tree];

    const prop = tree[0];
    if (!prop) return;

    object[prop] =
      tree.length === 1
        ? value
        : typeof object[prop] === 'object'
        ? object[prop]
        : {};

    setPropertyTree(object[prop], tree.slice(1), value);
  }

  function spreadsheetManager(request = '', options) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      const sheets = google.sheets('v4');
      const requestRegexp = /^[a-zA-Z]+(\.[a-zA-Z]+)*$/;

      if (!requestRegexp.test(request)) {
        throw new Error(
          `function ${spreadsheetManager.name}: argument "request" has incorrect format.`
        );
      }

      // The request can be compound (e.g. "values.get")
      // eslint-disable-next-line no-eval
      eval(`sheets.spreadsheets.${request}`)(
        {
          spreadsheetId: googleSpreadsheetId,
          ...options,
        },
        (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          resolve((response || {}).data);
        }
      );
    });
  }
}

//
// SYSTEM
//

function getScriptArgs() {
  const args = getProcessArgs({
    supported: [
      '--import',
      '--export',
      '--publish',
      '--merge',
      '--languages',
      '--help',
    ],
  });

  if (args.hasOwnProperty('import') && args.hasOwnProperty('export')) {
    throw new Error(
      `Arguments "--import" and "--export" cannot be used together.`
    );
  }
  if (
    args.hasOwnProperty('publish') &&
    !args.hasOwnProperty('export') &&
    !args.hasOwnProperty('merge')
  ) {
    throw new Error(
      `Argument "--publish" can be used in conjunction with "--export" or "--merge" arguments only.`
    );
  }
  if (args.hasOwnProperty('languages') && !args.hasOwnProperty('merge')) {
    throw new Error(
      `Argument "--languages" can be used in conjunction with "--merge" argument only.`
    );
  }
  return args;
}

function displayHelp() {
  console.log(
    unindent(`
    Usage: ./translations-manager <options>
    Options:
      --import    Import default translations from remote storage (Google Spreadsheet) to local CSV file
      --export    Export default translations from local to remote storage (Google Spreadsheet)
      --merge     Merge translations with another storage (Google Spreadsheet)
      --help      Help
  `).trim()
  );
}

function displayHelpImport() {
  console.log(
    unindent(`
    Usage: ./translations-manager --import
    Description: Import default translations from remote storage (Google Spreadsheet) to local CSV file
  `).trim()
  );
}

function displayHelpExport() {
  console.log(
    unindent(`
    Usage: ./translations-manager --export (--publish)
    Description: Export default translations from local to remote storage (Google Spreadsheet)
  `).trim()
  );
}

function displayExportingReport(report = {}) {
  const hasAdded = !!(report.added && report.added.length);
  const hasUpdated = !!(report.updated && report.updated.length);
  const hasDeleted = !!(report.deleted && report.deleted.length);
  const hasRestored = !!(report.restored && report.restored.length);

  // Empty line
  console.log('');

  if (!hasAdded && !hasUpdated && !hasDeleted && !hasRestored) {
    console.log(chalk.bold('No changes.'));
    return;
  }
  if (hasAdded) {
    const header = `Added ${report.added.length} ID(-s):`;
    console.log(
      `${chalk.bold(header)}\n${chalk.green(report.added.join('\n'))}`
    );
  }
  if (hasRestored) {
    const header = `Restored ${report.restored.length} ID(-s):`;
    console.log(
      `${chalk.bold(header)}\n${chalk.green(report.restored.join('\n'))}`
    );
  }
  if (hasUpdated) {
    const header = `Updated ${report.updated.length} ID(-s):`;
    console.log(
      `${chalk.bold(header)}\n${chalk.yellow(report.updated.join('\n'))}`
    );
  }
  if (hasDeleted) {
    const header = `Deleted ${report.deleted.length} ID(-s):`;
    console.log(
      `${chalk.bold(header)}\n${chalk.gray(report.deleted.join('\n'))}`
    );
  }
}

function getExtractedMessagesDirectory(basePath) {
  const babelrcPath = path.resolve(basePath, '.babelrc');
  const babelrc = fse.readJsonSync(babelrcPath);
  const bablercPlugins = babelrc.env.development.plugins || [];

  for (let i = 0; i < bablercPlugins.length; i++) {
    const plugin = bablercPlugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-intl') {
      return plugin[1].messagesDir;
    }
  }
}

function getSpreadsheetTitle(spreadsheetProps = {}) {
  return (spreadsheetProps.properties || {}).title;
}

//
// UTILS
//

function catchError(error = new Error()) {
  console.error(chalk.red(`${chalk.bold('ERROR')}\n${error.message || error}`));
  process.exit(1);
}

function getProcessArgs(options = {}) {
  const { supported: argsSupported } = options;

  const args = {};
  const argsProcess = process.argv.slice(2);

  argsProcess.forEach((arg = '') => {
    const argMatch = arg.match(/--([^=]+)(?:=(.*))?/) || [];
    const argBase = argMatch[1] || '';
    const argValue = argMatch[2] || true;

    if (argsSupported) {
      if (!argsSupported.length) {
        throw new Error(`Arguments are not supported.`);
      } else if (!~argsSupported.indexOf(`--${argBase}`)) {
        throw new Error(
          `Argument "${arg}" is incorrect. Supported arguments: ${argsSupported.join(
            ', '
          )}.`
        );
      }
    }

    args[argBase] = argValue;
  });

  return args;
}

function unindent(string) {
  const match = string.match(/^[^\S\n]*(?=\S)/gm);
  const indent = match ? Math.min(...match.map((space) => space.length)) : 0;
  return indent
    ? string.replace(new RegExp(`^[^\\S\\n]{${indent}}`, 'gm'), '')
    : string;
}

function logAsync(message, promise) {
  ora.promise(promise, message);
  return promise;
}

function runCmd(cmd, options = {}) {
  // Warning! If the "env" setting is defined then global environment variables aren't used
  return new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout = '') => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

function getDatetime(simplified = false) {
  const date = new Date().toISOString().slice(0, 19);
  return simplified ? date.replace(/[^0-9]/g, '') : date.replace('T', ' ');
}

function getDatesDiff(...args) {
  let date1;
  let date2;
  let measurement;
  let coefficient;

  if (args.length >= 3) {
    [date1, date2, measurement] = args;
    date1 = new Date(date1);
    date2 = new Date(date2);
  } else {
    [date2, measurement] = args;
    date1 = new Date();
    date2 = new Date(date2);
  }

  switch (measurement) {
    case 'ms':
      coefficient = 1;
      break;
    case 's':
      coefficient = 1000;
      break;
    case 'm':
      coefficient = 60 * 1000;
      break;
    case 'h':
      coefficient = 60 * 60 * 1000;
      break;
    case 'd':
      coefficient = 24 * 60 * 60 * 1000;
      break;
    default:
      throw new Error(
        `function ${getDatesDiff.name}: argument "measurement" is incorrect.`
      );
  }

  return Math.floor((date1 - date2) / coefficient);
}
