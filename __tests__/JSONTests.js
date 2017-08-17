jest.disableAutomock()

describe('TextStrings', () => {
  ['da', 'fi', 'sv', 'nb', 'en', 'nl', 'fr', 'it', 'es', 'de'].forEach(lang => {
    it(`it should have valid JSON for client/${lang}.json`, () => {
      require(`../text_strings/client/${lang}`)
    })

    it(`it should have valid JSON for server/${lang}.json`, () => {
      require(`../text_strings/server/${lang}`)
    })

    it(`it should have valid JSON for templates/${lang}.json`, () => {
      require(`../text_strings/templates/${lang}`)
    })
  })
})
