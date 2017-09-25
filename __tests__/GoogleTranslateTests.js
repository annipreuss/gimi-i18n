/* eslint flow-header/flow-header: 0 */
jest.disableAutomock()

describe('AnnaHelper', () => {
  xit('it should be able to hash string', () => {
    var translate = require('@google-cloud/translate')({
      projectId: 'gimi-969a7',
      keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
    })
    translate.translate('<span class="notranslate">{goal.updated_by.name}</span> har aktiverat sparmål <span class="notranslate">{goal.title}</span>.', 'sv')
      .then((err, translation) => {
        if (err) throw err
      })
  })
})
