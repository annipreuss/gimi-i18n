
const { exec } = require('child_process')

var languageCodesHolder = ['sv', 'en']
var cleanUpAnnaStore = []
var textStringsTypes = ['server', 'templates', 'client', 'gimi-web', 'share-image-generator']
var annaTranslationTag = 'ANNA'
var textStrings = {}
var changesMade = false

var runPoli = (key: string):* => {
  return exec(`npm run poli ${key}`)
}

var runAnna = (key: string) :* => {
  return exec(`npm run anna ${key}`)
}

var removeAnna = (lang, key):* => {

  if (lang[key].includes(annaTranslationTag)) {
    lang[key] = lang[key].replace('ANNA', '')
      // console.warn(lang[key])
  }
}
var commitChanges = ():* => {
  console.warn('Commit ')
  require ('child_process').exec('git --rebase', function(err, stdout) {
    console.warn('git pulled ')
    exec('git add --all && git commit -m "translation Bot" && git push')
  })
}


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
          cleanUpAnnaStore.push(key)
          changesMade = true
          if(languageCode ==='en') {
            runPoli(key)
          }

          if (languageCode ==='sv') {
            runAnna(key)
          }
        }
      }
    })

    cleanUpAnnaStore.forEach((langKey, index, object) => {
      removeAnna(lang, langKey)
      object.splice(index, 1)
    })
  })
})
if (changesMade) {
  commitChanges()
}
