
import {languageCodes, languageCodesForTranslation} from '../index'
import {searchPlzTranslate, searchBreakingSymbols, checkUpperCaseLetters} from '../TestUtil'
var stringTagData = []
var jsonDataTranslate = []
var jsonBreakingSumbols = []
var jsonArrayUpperCase = []

var textStringsTypes = ['server', 'templates', 'client', 'gimi-web', 'share-image-generator', 'moonshine', 'gimi-web-redux']

var textStrings = {}
textStringsTypes.forEach(textStringsType => {
  textStrings[textStringsType] = {}
})
textStringsTypes.forEach(textStringsType => {
  var languageCodesHolder = languageCodes
  if (textStringsType === 'moonshine') languageCodesHolder = ['sv', 'en']
  if (textStringsType === 'gimi-web-redux') languageCodesHolder = ['sv', 'en']
  if (textStringsType === 'gimi-web') languageCodesHolder = ['no', 'de', 'fi', 'fr', 'da', 'nl', 'it', 'es', 'sv', 'en']
  if (textStringsType !== 'gimi-web' && textStringsType !== 'gimi-web-redux' &&
  textStringsType !== 'moonshine') languageCodesHolder = languageCodesForTranslation

  languageCodesHolder.forEach(lang => {
    try {
      textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`)
    } catch (e) { expect(`Cant parse ${textStringsType}/${lang} ${e.message}`).toEqual('') }
  })
})
// server and templates string data
textStringsTypes.forEach(textStringsType => {
  var languageCodesHolder = languageCodes
  if (textStringsType === 'moonshine') languageCodesHolder = ['sv', 'en']
  if (textStringsType === 'gimi-web-redux') languageCodesHolder = ['sv', 'en']
  if (textStringsType === 'gimi-web') languageCodesHolder = ['no', 'de', 'fi', 'fr', 'da', 'nl', 'it', 'es', 'sv', 'en']
  if (textStringsType !== 'gimi-web' &&
    textStringsType !== 'gimi-web-redux' &&
    textStringsType !== 'moonshine') languageCodesHolder = languageCodesForTranslation

  languageCodesHolder.forEach(languageCode => {
    if (languageCode === 'sv' || languageCode === 'en')
      stringTagData.push(searchPlzTranslate(textStrings[textStringsType][languageCode], languageCode, textStringsType))

    stringTagData.push(searchBreakingSymbols(textStrings[textStringsType][languageCode], languageCode, textStringsType))
    if (languageCode === 'en' && textStringsType !== 'gimi-web' && textStringsType !== 'gimi-web-redux')
      stringTagData.push(checkUpperCaseLetters(textStrings[textStringsType][languageCode], languageCode, textStringsType))
  })
})
// get plzTransalte
stringTagData.forEach(data => {
  if (data) {
    if (data.plzTrans > 0) {
      let foo = data.data.map(({key, lang, path}) => `key: ${key}, path: ${path}, lang: ${lang}`)
      jsonDataTranslate.push(foo)
    }
    if (data.count > 0) {
      let foo = data.data.map(({key, lang, path}) => `key: ${key}, path: ${path}, lang: ${lang}`)
      jsonBreakingSumbols.push(foo)
    }
    if (data.countUpperCase > 0) {
      let foo = data.data.map(({key, lang, path}) => `key: ${key}, path: ${path}, lang: ${lang}`)
      jsonArrayUpperCase.push(foo)
    }
  }
})

it('it should not have breaking sumbols', () => {
  expect(jsonBreakingSumbols).toEqual([])
})

it('it should not have PLZ_TRANSLATE in sv and en', () => {
  expect(jsonDataTranslate).toEqual([])
})

it('it should not have uppercase in string keys', () => {
  expect(jsonArrayUpperCase).toEqual([])
})
