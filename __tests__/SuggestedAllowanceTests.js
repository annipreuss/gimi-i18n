
import SuggestedAllowance from '../SuggestedAllowance'
// import ExchangeRates from '../ExchangeRates'
import 'babel-polyfill'

jest.disableAutomock()

describe('default', () => {
  it('', () => {
    // expect(getSupportedCurrencyInfos()).not.toEqual(undefined)
  })

  it('SE', () => {

  })

  it('all currencies in Default CurrencyCodes needs to be in supported Currency Codes', () => {
    Object.keys(SuggestedAllowance).map((country) => {
      // console.log(SuggestedAllowance[country])
    })
  })
})
