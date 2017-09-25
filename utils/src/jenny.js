/* eslint flow-header/flow-header: 0 */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var keysToIgnore = [
  'child_about_data_tracking_title',
  'child_about_data_tracking_content',
  'parent_about_data_tracking_title',
  'parent_about_data_tracking_content',
  'child_advice_title',
  'child_advice_content',
  'parent_advice_title',
  'parent_advice_content',
  'data_knowledge_item_text',
  'knowledge_child_item_content',
  'knowledge_child_item_header',
  'data_tracking_assignment_threshold',
  '_permissions_denied',
  'vp_help_page_title',
  'vp_help_page_content',
  'transactions_help_page_title',
  'transactions_help_page_content',
  'task_editor_title_input_hint_example',
  'task_status'
]

var keysToDelete = []
var fs = require('fs')
var rootDir = '..'
var dirsToCheck = ['components', 'libs', 'hocs', 'i18n', 'config', 'reducers']
let textStringsSvFilePath = './text_strings/client/sv.json'
var TextStrings = fs.readFileSync(textStringsSvFilePath, {encoding: 'utf8'})
TextStrings = JSON.parse(TextStrings)
var foundKeys = 0
var ignoredKeys = 0

let checkFile = (file, key) => {
  var fileContents = fs.readFileSync(file, {encoding: 'utf8'})

  var isOk = false

  if (fileContents.indexOf(key) !== -1) isOk = true

  if (key.indexOf('_parent') !== -1) {
    if (fileContents.indexOf(key.split('_parent')[0]) !== -1) isOk = true
  }

  if (key.indexOf('_child') !== -1) {
    if (fileContents.indexOf(key.split('_child')[0]) !== -1) isOk = true
  }

  return isOk
}
let checkIfTextStringIsObsolete = (key) => {
  var isOk = false
  dirsToCheck.forEach((dirName) => {
    var dir = `${rootDir}/${dirName}/`
    var files = fs.readdirSync(dir)
    files.forEach((file) => {
      try {
        file = `${dir}/${file}`
        // console.log(`Reading file: "${file}"`)
        if (checkFile(file, key)) {
          isOk = true
        }
      } catch (e) {
        // console.log(`Failed reading file: "${file}"`)
        // console.log(e.message)
      }
    })
  })

  // text string is probably obsolete
  if (!isOk) {
    if (keysToIgnore.some(ignoredKey => key.indexOf(ignoredKey) !== -1)) { ignoredKeys++ } else {
      foundKeys++
      keysToDelete.push(key)
      console.log(`${key}\t\t\t\t\t\t${TextStrings[key].replace('\n', '')}`)
    }
  }
}

console.log('****** Begin Scan ********\n')

Object.keys(TextStrings).forEach(key => checkIfTextStringIsObsolete(key))

console.log('****** Scan Complete ********')
console.log(
  `
  Ignored text_strings: ${ignoredKeys}
  Found text_strings to delete: ${foundKeys}`)
if (process.argv.some(x => x === 'f')) {
  /** ****** Deleting TextStrings *******/
  console.log(`
      Removing ${foundKeys} text_strings from ${textStringsSvFilePath} ..
      `)
  keysToDelete.forEach((key) => {
    delete TextStrings[key]
  })

  TextStrings = JSON.stringify(TextStrings, undefined, 2)
  fs.unlinkSync(textStringsSvFilePath)
  fs.writeFileSync(textStringsSvFilePath, TextStrings, {encoding: 'utf8'})

  console.log(`
      Done
      `)
} else {
  console.log(`
  run with f to remove ${foundKeys} text_strings from ${textStringsSvFilePath}
  `)
}
