
import { searchPlzTranslate } from '../TestUtil'

xit('it should not have PLZ_TRANSLATE in sv and en', () => {
  var stringTagData = []
  var jsonDataTranslate = []

  var textStringsTypes = ['server', 'templates', 'client', 'gimi-web', 'share-image-generator']

  var textStrings = {}
  textStringsTypes.forEach(textStringsType => {
    textStrings[textStringsType] = {}
  })
  textStringsTypes.forEach(textStringsType => {
    var languageCodesHolder = ['sv', 'en']

    languageCodesHolder.forEach(lang => {
      try {
        textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`)
      } catch (e) { expect(`Cant parse ${textStringsType}/${lang} ${e.message}`).toEqual('') }
    })
  })
  // server and templates string data
  textStringsTypes.forEach(textStringsType => {
    var languageCodesHolder = ['sv', 'en']

    languageCodesHolder.forEach(languageCode => {
      stringTagData.push(searchPlzTranslate(textStrings[textStringsType][languageCode], languageCode, textStringsType))
    })
  })
  // get plzTransalte
  stringTagData.forEach(data => {
    if (data.plzTrans > 0) {
      jsonDataTranslate.push(data.data)
    }
  })
  expect(jsonDataTranslate).toEqual([])
})
