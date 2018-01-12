
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var fs = require('fs')

let RunIda = (): * => {
  var files = ['config_AUD.json', 'config_CAD.json', 'config_DEF.json', 'config_DKK.json', 'config_EUR.json', 'config_GBP.json', 'config_INR.json', 'config_ISK.json', 'config_NOK.json',
    'config_NZD.json', 'config_SEK.json', 'config_THB.json', 'config_USD.json', 'config_IDR.json', 'config_CHF.json']
  files.forEach((file) => {
    syncConfigKeys(file)
  })
}

let syncConfigKeys = (file: string) => {
  var sekConfig = require('../../config/config_SEK.json')
  var config = require('../../config/' + file)

  // Delete Support
  Object.keys(config)
    .filter((key) => sekConfig[key] === undefined)
    .forEach((key) => {
      delete config[key]
      console.log(`Deleting key: '${key}' from ${file}`)
    })

  // Create
  Object.keys(sekConfig)
    .filter((key) => config[key] === undefined)
    .forEach((key) => {
      config[key] = sekConfig[key]
      console.log(`Creating key: '${key}' in ${file}`)
    })

  // Save changes
  var newConf = JSON.stringify(config, undefined, 2)
  fs.unlinkSync('./config/' + file)
  fs.writeFileSync('./config/' + file, newConf, {encoding: 'utf8'})
}

RunIda()
