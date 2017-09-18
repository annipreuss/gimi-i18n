
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
          lang[key] = lang[key].replace('ANNA', '')

          if(languageCode ==='en') {
            console.warn('running poli')
            runPoli(key)
            changesMade = true
          }

          if (languageCode ==='sv') {
            console.warn('running anna')
            runAnna(key)
            changesMade = true
          }
        }
      }
    })


  })
})
if (changesMade) {

  setTimeout(function () {

    console.warn('Commiting')
    commitChanges()
  }, 900);
}
