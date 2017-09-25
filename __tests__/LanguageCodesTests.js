/* eslint flow-header/flow-header: 0 */
import {getTextStrings, getLangugageCodes} from '../index'
jest.disableAutomock()

describe('LanguageCodes', () => {
  it('it should return LanguageCodes', () => {
    expect(getLangugageCodes()).not.toEqual(undefined)
  })

  it('it should return textStrings for all LanguageCodes', () => {
    var languageCodes = getLangugageCodes()
    languageCodes.forEach(languageCode => expect(getTextStrings(languageCode.code)).not.toEqual(undefined))
  })
})
