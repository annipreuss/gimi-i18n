/* eslint flow-header/flow-header: 0 */
import {getPhoneNumberPrefix, getCountryCodeFromLocale} from '../index'
jest.disableAutomock()

describe('TextStrings', () => {
  it('it should return 46 for se', () => {
    expect(getPhoneNumberPrefix('se')).toEqual(46)
  })

  it('it should return 47 for NO', () => {
    expect(getPhoneNumberPrefix('NO')).toEqual(47)
  })

  it('it should return 45 DK', () => {
    expect(getPhoneNumberPrefix('DK')).toEqual(45)
  })

  it('it should return Country Code', () => {
    expect(getCountryCodeFromLocale('sv_SE')).toEqual('SE')
  })
})
