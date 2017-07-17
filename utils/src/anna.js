/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var fs = require('fs')
var translate = require('@google-cloud/translate')({
  projectId: 'gimi-969a7',
  keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
})

var AnnaHelper = require('./AnnaHelper')
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web']

let RunAnna = (filePath):* => {
  var hasPLZTranslate = false
  let getPath = (file) => `${filePath}/${file}`
  var {toHash, fromHash, translationHelpTemplate, translateFrom} = AnnaHelper
  let getTranslateFromPath = `${filePath}/` + translateFrom

  let translateTextStringForFile = (file, textId) => {
    if (file === 'default.json') { return Promise.resolve() }
    if (file.indexOf('.json') === -1) { return Promise.resolve() }

    if (file === 'sv.json') {
      return Promise.resolve()
    }
    /* Translate from given string
        var path = getPath(file)
        var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})
        TextStrings = JSON.parse(TextStrings)
        var stringToTranslate = TextStrings[textId]
    */

    // Translate To
    var path = getPath(file)
    var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})
    TextStrings = JSON.parse(TextStrings)

    // Translate From
    var TranslationString = fs.readFileSync(getTranslateFromPath, {encoding: 'utf8'})
    TranslationString = JSON.parse(TranslationString)

    var stringToTranslate = TranslationString[textId]

    // Translation source should not have 'PLZ_TRANSLATE'
    if (file === translateFrom && stringToTranslate) {
      if (stringToTranslate.includes('PLZ_TRANSLATE')) {
        hasPLZTranslate = true
      }
    }
    // Should ignore translation file
    if (file === translateFrom) {
      return Promise.resolve()
    }

    if (!stringToTranslate) {
      return Promise.reject(new Error(`Cant find textid: ${textId} in file: ${path}`))
    }
    var lang = file.replace('TextStrings_', '').replace('.json', '')
    if (lang === 'nb') {
      lang = 'no'
    }

    // hash %1$d to num evals to work with google translate
    var stringToTranslate = toHash(stringToTranslate)

    return translate.translate(stringToTranslate, lang, (err, translation) => {
      if (err) {
        return console.log(`Error on textId ${textId}. message: ${err}. file: ${file}`)
      }
      if (hasPLZTranslate) {
        return console.warn(`Should not have PLZ_TRANSLATE in textid: ${textId} in file: ${getTranslateFromPath}`)
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

  let translateTextId = (textIdToTranslate) => {
    Promise.all(fs.readdirSync(filePath).map((file) => translateTextStringForFile(file, textIdToTranslate)))
      .then(() => console.log('saved Successfully :)'))
      .catch((err) => console.error(err.message))
  }

  let textIdToTranslate = process.argv[2]

  if (!textIdToTranslate) { console.log('use: npm run anna <text_id>') }

  if (textIdToTranslate) {
    if(textIdToTranslate.indexOf(',') > 0) {
      var splitIds = textIdToTranslate.split(',')
      for (var i=0; i<splitIds.length; i++) {
          translateTextId(splitIds[i])
      }
    } else {
      translateTextId(textIdToTranslate)
    }
  }

}
templateDir.forEach((filePath) => {
  RunAnna(filePath)
})
