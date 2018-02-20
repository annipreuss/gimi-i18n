// @flow
import da from './text_strings/client/da.json'
import fi from './text_strings/client/fi.json'
import is from './text_strings/client/is.json'
import sv from './text_strings/client/sv.json'
import fr from './text_strings/client/fr.json'
import nl from './text_strings/client/nl.json'
import no from './text_strings/client/nb.json'
import en from './text_strings/client/en.json'
import be from './text_strings/client/be.json'
import it from './text_strings/client/it.json'
import es from './text_strings/client/es.json'
import de from './text_strings/client/de.json'
import et from './text_strings/client/et.json'

// calendar
import defaultCalendar from './text_strings/calendar/default.json'
import daCalendar from './text_strings/calendar/da.json'
import fiCalendar from './text_strings/calendar/fi.json'
import isCalendar from './text_strings/calendar/is.json'
import svCalendar from './text_strings/calendar/sv.json'
import frCalendar from './text_strings/calendar/fr.json'
import nlCalendar from './text_strings/calendar/nl.json'
import noCalendar from './text_strings/calendar/nb.json'
import enCalendar from './text_strings/calendar/en.json'
import beCalendar from './text_strings/calendar/be.json'
import itCalendar from './text_strings/calendar/it.json'
import esCalendar from './text_strings/calendar/es.json'
import deCalendar from './text_strings/calendar/de.json'
import etCalendar from './text_strings/calendar/et.json'

import _default from './text_strings/client/default.json'
import CountryCodes from './CountryCodes.json'
import Regions from './Regions.json'
import Cities from './Cities.json'
import Timezones from './TimeZones.json'
import LanguageCodes from './LanguageCodes.json'
import countryCodes2PhoneNumberPrefixes from './countryCodes2PhoneNumberPrefixes.json'
import ExchangeRates from './ExchangeRates'
import DefaultCurrencies from './DefaultCurrencies'
import {allowanceSuggestions} from './config/AllowanceSuggestions'
export var supportedLanguageCodes = ['da', 'fi', 'sv', 'nb', 'en', 'fr', 'nl', 'be', 'it', 'es', 'de', 'et']
export var supportedTimeZonesAndroid =
  ['Europe/Stockholm', 'Europe/Oslo', 'Europe/Helsinki', 'Europe/Copenhagen', 'Europe/Prague', 'Europe/London', 'America/New_York', 'America/Los_Angeles',
    'America/Vancouver', 'America/Panama', 'Pacific/Guam', 'Pacific/Palau', 'America/Puerto_Rico', 'Africa/Windhoek', 'Australia/Sydney', 'America/Toronto',
    'Pacific/Auckland', 'Asia/Calcutta', 'Africa/Cairo']

export var languageCodes = ['da', 'fi', 'is', 'sv', 'nb', 'en', 'fr', 'nl', 'be', 'it', 'es', 'de', 'et']

export let languageCodesForTranslation = ['nb', 'de', 'fi', 'fr', 'da', 'nl', 'it', 'es', 'sv', 'en']

export let getSuggestedAllowanceByAgeAndCountry = (birthDayYear: number, countryCode: string, allowanceType: number) => {
  var suggestedAllowanceForCountry = allowanceSuggestions[countryCode]
  var allowanceTypeConverted = allowanceType === 0 ? 'weekly' : 'monthly'
  var defaultAllowanceConf = allowanceSuggestions['default'][allowanceTypeConverted][birthDayYear]

  switch (true) {
    case !suggestedAllowanceForCountry:
      return ExchangeRates[getDefaultCurrencyCode(countryCode)] * defaultAllowanceConf
    default:
      return suggestedAllowanceForCountry[allowanceTypeConverted][birthDayYear]
  }
}

export let getSupportedCurrencyInfos = (): Array<{code: string, name: string}> => [
  {code: 'SEK', name: 'Swedish Krona'},
  {code: 'NOK', name: 'Norwegian Krone'},
  {code: 'DKK', name: 'Danish Krone'},
  {code: 'GBP', name: 'Pound Sterling'},
  {code: 'USD', name: 'US Dollar'},
  {code: 'EUR', name: 'Euro'},
  {code: 'AUD', name: 'Australian Dollar'},
  {code: 'CAD', name: 'Canadian Dollar'},
  {code: 'NZD', name: 'New Zealand Dollar'},
  {code: 'INR', name: 'Indian Rupee'},
  {code: 'ZAR', name: 'Rand'},
  {code: 'ISK', name: 'Iceland Krona'},
  {code: 'THB', name: 'Thai Baht'},
  {code: 'IDR', name: 'Indonesian Rupiahs'},
  {code: 'CHF', name: 'Swiss Franc'},
  {code: 'COP', name: 'Colombian Peso'}
]

export let getTextStrings = (lang: string) => {
  switch (lang.substring(0, 2)) {
    case 'da' : return {..._default, ...da} // danish
    case 'sv' : return {..._default, ...sv} // sweden
    case 'nb' :
    case 'nn' : return {..._default, ...no} // norway
    case 'fr' : return {..._default, ...fr} // france
    case 'nl' : return {..._default, ...nl} // Netherlands
    case 'be' : return {..._default, ...be} // belgian
    case 'fi' : return {..._default, ...fi} // finish
    case 'it' : return {..._default, ...it} // italian
    case 'es' : return {..._default, ...es} // spanish
    case 'de' : return {..._default, ...de} // german
    case 'is' : return {..._default, ...is} // island
    case 'et' : return {..._default, ...et} // Estonia
    default : return {..._default, ...en}
  }
}

export let getCalendarStrings = (lang: string) => {
  switch (lang.substring(0, 2)) {
    case 'da' : return {...defaultCalendar, ...daCalendar} // danish
    case 'sv' : return {...defaultCalendar, ...svCalendar} // sweden
    case 'nb' :
    case 'nn' : return {...defaultCalendar, ...noCalendar} // norway
    case 'fr' : return {...defaultCalendar, ...frCalendar} // france
    case 'nl' : return {...defaultCalendar, ...nlCalendar} // Netherlands
    case 'be' : return {...defaultCalendar, ...beCalendar} // belgian
    case 'fi' : return {...defaultCalendar, ...fiCalendar} // finish
    case 'it' : return {...defaultCalendar, ...itCalendar} // italian
    case 'es' : return {...defaultCalendar, ...esCalendar} // spanish
    case 'de' : return {...defaultCalendar, ...deCalendar} // german
    case 'is' : return {...defaultCalendar, ...isCalendar} // island
    case 'et' : return {...defaultCalendar, ...etCalendar} // Estonia
    default : return {...defaultCalendar, ...enCalendar}
  }
}

export let getRegions = () => Regions
export let getCities = () => Cities
export let getCountries = () => CountryCodes
export let getCountry = (countryCode: string) => CountryCodes.find(country => country.code === countryCode)
export let getPhoneNumberPrefix = (countryCode: string) => parseInt(countryCodes2PhoneNumberPrefixes[countryCode.toUpperCase()])
export let getCountryCodeFromLocale = (locale: string) => locale.slice(-2)
export let getTimezones = () => Timezones
export let getLangugageCodes = () => LanguageCodes.filter(languageCode => supportedLanguageCodes.indexOf(languageCode.code) !== -1)
export let getDefaultCurrencyCode = (userCountryCode: string): string => DefaultCurrencies[userCountryCode] || 'EUR'

export let getSupportedTimeZones = () => {
  var shortList = []
  Timezones.map((zone, index) => {
    if (supportedTimeZonesAndroid.indexOf(zone.value) !== -1)
      shortList.push(zone)
  })
  return shortList || Timezones
}

// trigger build
