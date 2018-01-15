import AllowanceSuggestions from '../config/AllowanceSuggestions.js'

jest.unmock('../config/AllowanceSuggestions.js')
describe('AllowanceSuggestions', () => {
  var countryCodes = Object.keys(AllowanceSuggestions)
  var MONTHLY = 'monthly'
  var WEEKLY = 'weekly'
  it('Should have default as first in the list', () => {
    expect(countryCodes[0]).toEqual('default')
  })
  countryCodes.forEach(code => {
  //  console.log('code', AllowanceSuggestions[code])

    it('Should have same age for all contries', () => {
      countryCodes.forEach(code2 => compareAllowanceKeys(AllowanceSuggestions[code].weekly, AllowanceSuggestions[code2].weekly, code, code2, WEEKLY))
      countryCodes.forEach(code2 => compareAllowanceKeys(AllowanceSuggestions[code].monthly, AllowanceSuggestions[code2].monthly, code, code2, MONTHLY))
    })
    it('Should have bigger values for older kids', () => {
      compareAllowanceKeysValues(AllowanceSuggestions[code].weekly, code, WEEKLY)
      compareAllowanceKeysValues(AllowanceSuggestions[code].monthly, code, MONTHLY)
    })
  })
})

export let compareAllowanceKeys = (firstCountry: Object, secondCountry: Object, firstLangName: string = '', secondLangName: string = '', type: string) => {
  var keys = Object.keys(firstCountry)

  var errorMessages = []
  keys.forEach(key => {
    if (secondCountry[key] === undefined || secondCountry[key] === '') {
      errorMessages.push(`Country: '${secondLangName}', Missing age: '${key}', With type '${type}'`)
      return true
    }
    return true
  })
  expect(errorMessages).toEqual([])
}

export let compareAllowanceKeysValues = (firstCountry: Object, firstCountryCode: string = '', type: string) => {
  var keys = Object.keys(firstCountry)

  var errorMessages = []
  keys.forEach(key => {
    if (firstCountry[key] === undefined || firstCountry[key] === '') {
      errorMessages.push(`Country: '${firstCountryCode}', Missing key : '${key}', With type '${type}'`)
      return true
    }

    return true
  })
  var values = Object.values(firstCountry)
  if (!isSorted(values))
    errorMessages.push(`Country: '${firstCountryCode}', Value should be rising : '${values}', With type '${type}'`)

  expect(errorMessages).toEqual([])
}

export let isSorted = (keys: Array<Object>): boolean => keys.every((key, i, array) => array[i] >= array[Math.max(i - 1, 0)])
