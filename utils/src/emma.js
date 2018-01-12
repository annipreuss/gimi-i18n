
const {execSync} = require('child_process')
var fs = require('fs')
var {TRAVIS} = process.env

let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web', './text_strings/share-image-generator']
let files = ['sv.json', 'en.json']

var LADIES = {
  anna: 'ANNA',
  emma: 'EMMA',
  poli: 'POLI',
  krisi: 'KRISI'
}

let getTranslateInfoFrom = (path) => {
  var TextStringsStr = fs.readFileSync(path, {encoding: 'utf8'})
  var TextStrings = JSON.parse(TextStringsStr)
  var keys = Object.keys(TextStrings)
  let textIds = []

  keys.forEach(textid => {
    var text = TextStrings[textid]
    if (!text) text = ''

    Object.keys(LADIES).forEach((lady) => {
      if (TextStrings[textid].includes(LADIES[lady])) textIds.push({textid, lady})
    })
  })

  return {textIds, path}
}

let removeANNAStringFromFile = (path) => {
  var json = fs.readFileSync(path, {encoding: 'utf8'})
  Object.keys(LADIES).forEach((lady) => {
    let LADY = LADIES[lady]
    json = json.replace(new RegExp(`${LADY} `, 'g'), '')
    json = json.replace(new RegExp(` ${LADY}`, 'g'), '')
    json = json.replace(new RegExp(`${LADY}`, 'g'), '')
  })

  fs.unlinkSync(path)
  fs.writeFileSync(path, json, {encoding: 'utf8'})
}

var info = templateDir.reduce((a, b) => a.concat(files.map((file) => getTranslateInfoFrom(`${b}/${file}`))), [])
info = info.filter((x) => x.textIds.length > 0)

info.forEach(x => removeANNAStringFromFile(x.path))

info.forEach((x) => {
  var {textIds} = x
  textIds.map(({textid, lady}) => {
    let cmd = `npm run ${lady}-d ${textid}`
    // eslint-disable-next-line
    console.log(cmd)
    execSync(cmd)
  })
})

if (info.length === 0) {
  // eslint-disable-next-line
  console.log('Found no textstrings to translate')
  process.exit()
}
// eslint-disable-next-line
if (!process.argv.join().includes('--push-changes')) process.exit()

// eslint-disable-next-line
execSync('git remote add origin-with-push-access https://${GH_TOKEN}@github.com/gimi-org/gimi-i18n.git')
execSync('git add --all')
execSync(`git commit -m "Google Translated ${info[0].textIds.join(' ')}"`)
if (TRAVIS) execSync('git push --no-verify --set-upstream origin-with-push-access')
