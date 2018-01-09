/* eslint flow-header/flow-header: 0 */
import {getSupportedCurrencyInfos, getDefaultCurrencyCode} from '../index'
import DefaultCurrencies from '../DefaultCurrencies'
import ExchangeRates from '../ExchangeRates'
import 'babel-polyfill'
import Decimal from 'decimal.js-light'

jest.disableAutomock()

describe('Currencies', () => {
  it('it should return supported supportedCurrencyCodes', () => {
    expect(getSupportedCurrencyInfos()).not.toEqual(undefined)
    expect(getSupportedCurrencyInfos().length).toEqual(16)
    expect(getSupportedCurrencyInfos()).toMatchSnapshot()
  })

  it('it should return default currency', () => {
    expect(getDefaultCurrencyCode('FI')).toEqual('EUR')
    expect(getDefaultCurrencyCode('NO')).toEqual('NOK')
    expect(getDefaultCurrencyCode('GB')).toEqual('GBP')
    expect(getDefaultCurrencyCode('SE')).toEqual('SEK')
    expect(getDefaultCurrencyCode('BE')).toEqual('EUR')
    expect(getDefaultCurrencyCode()).toEqual('EUR')
  })

  it('all currencies in Default CurrencyCodes needs to be in supported Currency Codes', () => {
    Object.values(DefaultCurrencies).forEach((currencyCode) => expect(getSupportedCurrencyInfos().find((currencyInfo) => currencyInfo.code === currencyCode)).toBeDefined())
  })

  Object.keys(DefaultCurrencies).forEach(key => {
    it(`Should be an exchange rate for ${key} (entry found in default currencies)`, () => {
      expect(ExchangeRates[DefaultCurrencies[key]]).toBeDefined()
    })
  })

  Object.keys(getSupportedCurrencyInfos()).forEach(key => {
    it(`All defined currencies should have conversion rate ${ExchangeRates[getSupportedCurrencyInfos()[key].code]} `, () => {
      expect(ExchangeRates[getSupportedCurrencyInfos()[key].code]).toBeDefined()
    })
  })

  Object.keys(getSupportedCurrencyInfos()).forEach(key => {
    it(`All defined currencies should be a positive number ${ExchangeRates[getSupportedCurrencyInfos()[key].code]} `, () => {
      var exchangeRate = new Decimal(ExchangeRates[getSupportedCurrencyInfos()[key].code])

      expect(exchangeRate.isPositive()).toBeTruthy()
      expect(ExchangeRates[getSupportedCurrencyInfos()[key].code]).toBeDefined()
    })
  })
})
