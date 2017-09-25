/* eslint flow-header/flow-header: 0 */
import {getCountries, getCountry} from '../index'
jest.disableAutomock()

describe('TextStrings', () => {
  it('it should return Country Code', () => {
    expect(getCountries()).not.toEqual(undefined)
  })

  it('it should be able to get Countries', () => {
    expect(getCountry('SE')).toEqual({'name': 'Sweden', 'dial_code': '+46', 'code': 'SE'})
  })
})
