
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var fs = require('fs')
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web']

let RunSara = (filePath): * => {
  let getPath = (file) => `${filePath}/${file}`
  var defaultPath = getPath('default.json')
  var _default = fs.readFileSync(defaultPath, {encoding: 'utf8'})
  _default = JSON.parse(_default)

  var svPath = getPath('sv.json')
  var sv = fs.readFileSync(svPath, {encoding: 'utf8'})
  sv = JSON.parse(sv)

  let syncTextStrings = (file) => {
    if (file.indexOf('.json') === -1)
      return

    if (file === 'default.json') return

    if (file === 'sv.json')
      return

    var path = getPath(file)

    var TextStrings = fs.readFileSync(path, {encoding: 'utf8'})
    TextStrings = JSON.parse(TextStrings)

    // Delete Support
    Object.keys({...TextStrings})
      .filter((key) => sv[key] === undefined)
      .forEach((key) => {
        delete TextStrings[key]
        console.log(`Deleting key: '${key}' from ${file}`)
      })

    // Craete Support
    var NewTextStrings = {...sv, ...TextStrings}
    Object.keys(_default).forEach(key => delete NewTextStrings[key])
    var NewTextStringsLength = Object.keys(NewTextStrings).length
    var TextStringsLength = Object.keys(TextStrings).length
    var delta = NewTextStringsLength - TextStringsLength

    if (delta > 0)
      console.log(`Updated ${delta} textstrings in ${file}`)

    // No update support atm :(

    // Save changes
    NewTextStrings = JSON.stringify(NewTextStrings, undefined, 2)
    fs.unlinkSync(path)
    fs.writeFileSync(path, NewTextStrings, {encoding: 'utf8'})
  }

  fs.readdirSync(filePath).forEach((languageCode) => syncTextStrings(languageCode))

  // fix swedish TextStrings formatting
  sv = JSON.stringify(sv, undefined, 2)
  fs.unlinkSync(svPath)
  fs.writeFileSync(svPath, sv, {encoding: 'utf8'})
}
templateDir.forEach((filePath) => {
  RunSara(filePath)
})
