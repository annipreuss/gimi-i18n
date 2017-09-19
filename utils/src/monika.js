
const { exec } = require('child_process')
var fs = require('fs')

var languageCodesHolder = ['sv', 'en']
var cleanUpAnnaStore = []
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web']

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
    exec('git add --all && git commit -m "translation Bot"')
  })
}

let RunMonika = (filePath):* => {

  let getPath = (file) => `${filePath}/${file}`

  if (file.indexOf('.json') === -1) { return void 0 }

  var path = getPath(file)
  var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})

  TextStrings = JSON.parse(TextStrings)


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

            TextStrings[key]lang[key].replace('ANNA', '')
            if (!stringRemoveAnna) {
              console.warn(`Cant find textid: ${textId} in file: ${path}`)
              return void 0
            }
            TextStrings = JSON.stringify(TextStrings, undefined, 2)
            fs.unlinkSync(path)
            return fs.writeFileSync(path, TextStrings, {encoding: 'utf8'})
            
            setTimeout(function () {
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
            },300)
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
}
templateDir.forEach((filePath) => {
  RunMonika(filePath)
})
