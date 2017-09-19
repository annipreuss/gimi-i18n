
const { exec } = require('child_process')
var fs = require('fs')
var {TRAVIS} = process.env

var languageCodesHolder = []
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web', './text_strings/share-image-generator']

var annaTranslationTag = 'ANNA'
var changesMade = false
var multipleAnnaSupport =[]

var runPoli = (key: string):* => {
  console.log(key)
  return exec(`npm run poli ${key}`)
}

var runAnna = (key: string) :* => {
  console.log(key)
  return exec(`npm run anna ${key}`)
}

var commitChanges = ():* => {
  require ('child_process').exec('git --rebase', function(err, stdout) {
    console.warn('git pulled ')
    if(TRAVIS) exec('git add --all && git commit -m "translation Bot" && git push --no-verify --set-upstream origin-with-push-access')
    else exec('git add --all && git commit -m "translation Bot" && git push')
  })
}

let RunMonika = ():* => {
  templateDir.forEach((filePath) => {
    let getPath = (file) => `${filePath}/${file}`

    let transalteANNAString = (file) => {
        if (file === 'default.json') { return Promise.resolve() }
        if (file.indexOf('.json') === -1) { return Promise.resolve() }

       var path = getPath(file)
       var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})

       TextStrings = JSON.parse(TextStrings)

       var keys = Object.keys(TextStrings)

       keys.forEach(key => {

         if (!TextStrings[key]) {
           //console.warn(`Cant find textid: ${key} in file: ${path}`)
           return void 0
         }
         if (TextStrings[key].includes(annaTranslationTag)) {

           TextStrings[key] = TextStrings[key].replace('ANNA ', '')

           multipleAnnaSupport.push(key)
           console.log(key)
           changesMade = true
         }

       })
       TextStrings = JSON.stringify(TextStrings, undefined, 2)
       fs.unlinkSync(path)
       fs.writeFileSync(path, TextStrings, {encoding: 'utf8'})

       if (languageCodesHolder.indexOf(file.replace('TextStrings_', '').replace('.json', '')) == -1) {
         languageCodesHolder.push(file.replace('TextStrings_', '').replace('.json', ''))
       }

     }




    return Promise.all(fs.readdirSync(filePath).map((file) => transalteANNAString(file)))
      .then(() => {
        if(!changesMade) {
          console.log(`Found no strings to translate for ${filePath}`)
        }
      })
      .catch((err) => console.error(err.message))

  })
   return Promise.resolve()
}
runAnnaAndPoli = () => {
  var multipleAnnaSupportStr = multipleAnnaSupport.join(',')

  languageCodesHolder.forEach((lang)=> {
    if(lang === 'en') {
      console.warn('running poli')
      changesMade = true
      return Promise.resolve(runPoli(multipleAnnaSupportStr))
     }

   if (lang === 'sv') {
     console.warn('running anna')
     changesMade = true
     return Promise.resolve(runAnna(multipleAnnaSupportStr))

   }
 })
  return Promise.resolve()
}

  RunMonika().then(() => {
    runAnnaAndPoli().then(()=> {
      if(changesMade) {
        setTimeout(function () {
          console.warn('Started git commit')
          commitChanges()
        }, 400);
      }

    })
  })
