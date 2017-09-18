
const { exec } = require('child_process')

var languageCodesHolder = ['sv', 'en']

var textStringsTypes = ['server', 'templates', 'client', 'gimi-web', 'share-image-generator']
var annaTranslationTag = 'ANNA'
var textStrings = {}
textStringsTypes.forEach(textStringsType => {
  textStrings[textStringsType] = {}
})
textStringsTypes.forEach(textStringsType => {

  languageCodesHolder.forEach(lang => {
    try {
      textStrings[textStringsType][lang] = require(`../../text_strings/${textStringsType}/${lang}`)
    } catch (e) {
      console.warn(`Cant parse ${textStringsType}/${lang} ${e.message}`)
    }
  })
})

textStringsTypes.forEach(textStringsType => {

  languageCodesHolder.forEach(languageCode => {
    var lang = textStrings[textStringsType][languageCode]
    var keys = Object.keys(lang)

    keys.forEach(key => {
      if (languageCode) {
        if (lang[key].includes(annaTranslationTag)) {
          if(languageCode ==='en') {
            exec("npm run poli `${key}`")
          }
          if (languageCode ==='sv') {
            exec("npm run anna `${key}`")
          }
        }
      }
    })
  })


})
