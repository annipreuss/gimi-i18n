/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

var fs = require('fs')
var translate = require('@google-cloud/translate')({
  projectId: 'gimi-969a7',
  keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
})

var AnnaHelper = require('./AnnaHelper')
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web']

let RunPolina = (filePath):* => {
  let getPath = (file) => `${filePath}/${file}`
  var {toHash, fromHash, translationHelpTemplate} = AnnaHelper
  let translateTextStringForFile = (file, textId) => {
    if (file.indexOf('.json') === -1) { return void 0 }

    var path = getPath(file)
    var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})
    TextStrings = JSON.parse(TextStrings)
    var stringToTranslate = TextStrings[textId]

    if (!stringToTranslate) {
      console.warn(`Cant find textid: ${textId} in file: ${path}`)
      return void 0
    }
    var lang = file.replace('TextStrings_', '').replace('.json', '')

    // hash %1$d to num evals to work with google translate
    stringToTranslate = toHash(stringToTranslate)

    return translate.translate(stringToTranslate, lang, (err, translation) => {
      if (err) {
        return console.log(`Error on textId ${textId}. message: ${err}. file: ${file}`)
      }
      var translatedText = fromHash(translation)
      console.log(`Translated text: '${stringToTranslate}' to: '${translatedText}' in ${filePath}/${file}`)
      var re = /PLZ_TRANSLATE/g
      if (re.test(translatedText)) {
        TextStrings[textId] = translatedText
      } else {
        TextStrings[textId] = `${translationHelpTemplate} ${translatedText}`
      }

      TextStrings = JSON.stringify(TextStrings, undefined, 2)
      fs.unlinkSync(path)
      return fs.writeFileSync(path, TextStrings, {encoding: 'utf8'})
    })
  }
  let translateTextId = (file, textIdToTranslate) => {
    Promise.all(fs.readdirSync(filePath).map((file) => translateTextStringForFile(file, textIdToTranslate)))
      .then(() => console.log('saved Successfully :)'))
      .catch((err) => console.error(err.message))
  }

  let textIdToTranslate = process.argv[2]

  if (!textIdToTranslate) { console.log('use: npm run poli <text_id>') }

  if (textIdToTranslate) {
    if(textIdToTranslate.indexOf(',') > 0) {
      var splitIds = textIdToTranslate.split(',')

      Object.keys(splitIds).forEach((key) => {
          console.log(splitIds[key])
          translateTextId('en.json', splitIds[key])
      })
    } else {
      translateTextId('en.json', textIdToTranslate)
    }
  }
}
templateDir.forEach((filePath) => {
  RunPolina(filePath)
})
