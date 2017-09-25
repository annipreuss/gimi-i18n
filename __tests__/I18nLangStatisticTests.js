/* eslint flow-header/flow-header: 0 */
import {getTextStrings, languageCodes, languageCodesForTranslation} from '../index'
import {stringLenghtStatistic, stringTranslationTags} from '../TestUtil'
var languageCodesHolder = languageCodes
var Slack = require('node-slack')

jest.disableAutomock()

describe('TextStrings', () => {
  xit('it should export in slack the length of text_strings', () => {
    var stringLengthData

    languageCodes.forEach(languageCode => {
      stringLengthData = stringLenghtStatistic(getTextStrings('en'), getTextStrings(languageCode), 'en', languageCode)
      var attachmentPayload = [
        {
          fallback: 'String lenght data',
          text: 'Link to git "' + languageCode + '"  <https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/client/' + languageCode + '.json|Click here>',
          color: stringLengthData.status ? 'warning' : '#36a64f', // Can either be one of 'good', 'warning', 'danger', or any hex color code
          // Fields are displayed in a table on the message
          fields: stringLengthData.data
        }
      ]
      // https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/client/be.json
      if (stringLengthData.data.length > 1) SendToSlackStats(attachmentPayload, languageCode)
    })
  })

  it('it should show where we have PLZ_TRANSLATE', () => {
    var stringTagData = []
    var jsonDataCheck = []
    var jsonDataTranslate = []

    var textStringsTypes = ['server', 'templates', 'client', 'gimi-web', 'share-image-generator']

    var textStrings = {}
    textStringsTypes.forEach(textStringsType => {
      textStrings[textStringsType] = {}
    })
    textStringsTypes.forEach(textStringsType => {
      if (textStringsType === 'gimi-web') { languageCodesHolder = ['no', 'de', 'fi', 'fr', 'da', 'nl', 'it', 'es', 'sv', 'en'] }
      if (textStringsType !== 'gimi-web') { languageCodesHolder = languageCodesForTranslation }
      languageCodesHolder.forEach(lang => {
        try {
          textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`)
        } catch (e) { expect(`Cant parse ${textStringsType}/${lang} ${e.message}`).toEqual('') }
      })
    })
    // server and templates string data
    textStringsTypes.forEach(textStringsType => {
      if (textStringsType === 'gimi-web') { languageCodesHolder = ['no', 'de', 'fi', 'fr', 'da', 'nl', 'it', 'es', 'sv', 'en'] }
      if (textStringsType !== 'gimi-web') { languageCodesHolder = languageCodesForTranslation }
      languageCodesHolder.forEach(languageCode => {
        stringTagData.push(stringTranslationTags(textStrings[textStringsType][languageCode], languageCode, textStringsType))
      })
    })

    // get plz Check
    stringTagData.forEach(data => {
      var path = data.path ? data.path : 'client'
      var isAdded = false
      if (data.plzCheck > 0) {
        for (var i = 0; i < jsonDataCheck.length; i++) {
          if (jsonDataCheck[i].lang === data.lang) {
            jsonDataCheck[i].path.push(path)
            jsonDataCheck[i].count.push(data.plzCheck)
            jsonDataCheck[i].link.push('<https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/' + path + '/' + data.lang + '.json|Click>')
            isAdded = true
          }
        }
        if (!isAdded) {
          var displayObject: Object = {
            lang: '',
            path: [],
            count: [],
            link: []
          }
          displayObject.lang = data.lang
          displayObject.path.push(path)
          displayObject.count.push(data.plzCheck)
          displayObject.link.push('<https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/' + path + '/' + data.lang + '.json|Click>')
          jsonDataCheck.push(displayObject)
        }
      }
    })
    // get plzTransalte
    stringTagData.forEach(data => {
      var path = data.path ? data.path : 'client'
      var isAdded = false
      if (data.plzTrans > 0) {
        for (var i = 0; i < jsonDataTranslate.length; i++) {
          if (jsonDataTranslate[i].lang === data.lang) {
            jsonDataTranslate[i].path.push(path)
            jsonDataTranslate[i].count.push(data.plzTrans)
            jsonDataTranslate[i].link.push('<https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/' + path + '/' + data.lang + '.json|Click>')
            isAdded = true
          }
        }
        if (!isAdded) {
          var displayObject: Object = {
            lang: '',
            path: [],
            count: [],
            link: []
          }
          displayObject.lang = data.lang
          displayObject.path.push(path)
          displayObject.count.push(data.plzTrans)
          displayObject.link.push('<https://github.com/Barnpengar/veckopengen-app-i18n-text-strings-/blob/master/text_strings/' + path + '/' + data.lang + '.json|Click>')
          jsonDataTranslate.push(displayObject)
        }
      }
    })

    var text = `PLZ_CHECK
    ${jsonDataCheck.map((i) => JSON.stringify(i)).join('\n')}
    PLZ_TRANSLATE
    ${jsonDataTranslate.map((i) => JSON.stringify(i)).join('\n')}`
    //eslint-disable-next-line

    text = text.replace(/['"]+/g, '')
    SendToSlackTagStats(text)
  })
})

export let SendToSlackStats = (attachmentPayload: Array<Object>, languageCode: string) => {
  var slack = new Slack('https://hooks.slack.com/services/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')
  slack.send({
    text: 'i18n Language files with languageCode "' + languageCode + '" are more than 25% longer then their English counter parts',
    channel: '#i18n_translation_stat',
    username: 'I18nLangStatistics',
    icon_emoji: ':bread:',
    attachments: attachmentPayload,
    unfurl_links: true,
    link_names: 1
  })
}
export let SendToSlackTagStats = (text: Array<Object>, languageCode: string) => {
  var slack = new Slack('https://hooks.slack.com/services/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')
  slack.send({
    text,
    channel: '#i18n_translation_tags',
    username: 'I18nLangStatistics',
    icon_emoji: ':ramen:',
    attachments: [],
    unfurl_links: true,
    link_names: 1
  })
}
