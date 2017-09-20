import fs from 'fs'
import jsonValidator from 'json-dup-key-validator'
jest.disableAutomock()

let templateDirs = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web', './text_strings/share-image-generator']

describe('TextStrings', () => {
  templateDirs.forEach((dir) => {
    fs.readdirSync(dir).forEach((file) => {
      let path = `${dir}/${file}`
      it(`it should have valid JSON for ${path}`, () => {
        let json = fs.readFileSync(path, {encoding: 'utf8'})
        jsonValidator.parse(json, false)
      })
    })
  })
})
