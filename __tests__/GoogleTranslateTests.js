var translate = require('@google-cloud/translate')({
  projectId: 'gimi-969a7',
  keyFilename: './utils/gkey/Gimi-b4f63676ca99.json'
})

jest.disableAutomock()

describe('AnnaHelper', () => {
  it('it should be able to hash string', () => {
    translate.translate('<span class="notranslate">{goal.updated_by.name}</span> har aktiverat sparmål <span class="notranslate">{goal.title}</span>.', 'sv')
      .then((err, translation) => {
        if (err) throw err
      })
      // eslint-disable-next-line
      .catch(err => console.log('Error: ', err))
  })
})
