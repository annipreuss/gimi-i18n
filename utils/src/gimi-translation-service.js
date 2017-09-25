/* eslint flow-header/flow-header: 0 */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var fs = require('fs')
var translate = require('@google-cloud/translate')({
  projectId: 'gimi-969a7',
  keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
})

var AnnaHelper = require('./AnnaHelper')
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web', './text_strings/share-image-generator']
let DEFAULT_JSON = 'default.json'
let DEFAULT_FROM_FILE = AnnaHelper.DEFAULT_FROM_FILE

let getFiles = (dir: string, fromFileName, toFileName, excludeFileName) =>
  fs.readdirSync(dir)
    .filter((fileName) => fileName !== fromFileName && fileName !== DEFAULT_JSON)
    .filter((fileName) => toFileName !== 'xx.json' ? fileName === toFileName : true)
    .filter((fileName) => excludeFileName !== 'xx.json' ? fileName !== excludeFileName : true)
    .map((fileName) => `${dir}/${fileName}`)

let translateTextStringInFile = (path: string, textId, fromFilePath: string) => {
  var lang = path.replace('.json', '').split('/').pop()
  if (lang === 'nb') lang = 'no'
  if (fromFilePath === './text_strings/gimi-web/nb.json') fromFilePath = './text_strings/gimi-web/no.json' // ugle gimi-web support

  // Translate To
  let TextStringsJSON = fs.readFileSync(path, {encoding: 'utf8'})
  let TextStrings = JSON.parse(TextStringsJSON)

  // Translate From
  var TranslationString = fs.readFileSync(fromFilePath, {encoding: 'utf8'})
  TranslationString = JSON.parse(TranslationString)

  var stringToTranslate = TranslationString[textId]
  if (!stringToTranslate) return console.log(`Cant find ${textId} in ${path}`)

  // hash %1$d to num evals to work with google translate
  stringToTranslate = AnnaHelper.toHash(stringToTranslate)

  return translate.translate(stringToTranslate, lang, (err, translation) => {
    if (err) return console.log(`Error on textId ${textId}. message: ${err}. file: ${path}`)

    var translatedText = AnnaHelper.fromHash(translation)

    console.log(`Translated text: '${stringToTranslate}' to: '${translatedText}' in ${path}`)
    var re = /PLZ_TRANSLATE/g
    if (re.test(translatedText)) TextStrings[textId] = translatedText
    else TextStrings[textId] = `${AnnaHelper.translationHelpTemplate} ${translatedText}`

    TextStringsJSON = JSON.stringify(TextStrings, undefined, 2)
    fs.unlinkSync(path)
    return fs.writeFileSync(path, TextStringsJSON, {encoding: 'utf8'})
  })
}

console.log('process.argv.length', process.argv.length)
console.log('process.argv', process.argv)
if (process.argv.length !== 6) { throw new Error('use: npm run anna <from_lang> <to_lang> <exclude_lang> <text_id>') }
let fromFileName = process.argv[2] ? `${process.argv[2]}.json` : DEFAULT_FROM_FILE
let toFileName = process.argv[3] ? `${process.argv[3]}.json` : 'xx.json'
let excludeFileName = process.argv[4] ? `${process.argv[4]}.json` : 'xx.json'
let textIdToTranslate = process.argv[5]

console.log({textIdToTranslate, fromFileName, toFileName, excludeFileName})

templateDir.forEach((dir) => {
  var paths = getFiles(dir, fromFileName, toFileName, excludeFileName)
  console.log('paths', paths)

  Promise.resolve(paths.forEach((path) => translateTextStringInFile(path, textIdToTranslate, `${dir}/${fromFileName}`)))
    .then(() => console.log('saved Successfully :)'))
    .catch((err) => console.error(err.message))
})
