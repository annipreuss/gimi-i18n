/* eslint flow-header/flow-header: 0 */
import fs from 'fs'
import jsonValidator from 'json-dup-key-validator'
jest.disableAutomock()

let templateDirs = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web', './text_strings/share-image-generator']

describe('JSON files', () => {
  it('LOL')
  templateDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) return
    fs.readdirSync(dir).forEach((file) => {
      let path = `${dir}/${file}`
      it(`it should have valid JSON for ${path}`, () => {
        let json = fs.readFileSync(path, {encoding: 'utf8'})
        jsonValidator.parse(json, false)
      })
    })
  })
})
