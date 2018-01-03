// @flow
import ConfigNOK from '../config/config_NOK'
import ConfigDKK from '../config/config_DKK'
import ConfigAUD from '../config/config_AUD'
import ConfigCAD from '../config/config_CAD'
import ConfigEUR from '../config/config_EUR'
import ConfigGBP from '../config/config_GBP'
import ConfigINR from '../config/config_INR'
import ConfigNZD from '../config/config_NZD'
import ConfigSEK from '../config/config_SEK'
import ConfigUSD from '../config/config_USD'
import ConfigISK from '../config/config_ISK'
import ConfigDEF from '../config/config_DEF'
import ConfigTHB from '../config/config_THB'
import ConfigIDR from '../config/config_IDR'
import ConfigCHF from '../config/config_CHF'

export let getCurrencyConfig = (currencyCode: ?string) => {
  switch (currencyCode) {
    case 'CHF': return {...ConfigCHF, currencyCode}
    case 'IDR': return {...ConfigIDR, currencyCode}
    case 'DEF': return {...ConfigDEF, currencyCode}
    case 'NOK': return {...ConfigNOK, currencyCode}
    case 'DKK': return {...ConfigDKK, currencyCode}
    case 'SEK': return {...ConfigSEK, currencyCode}
    case 'GBP': return {...ConfigGBP, currencyCode}
    case 'USD': return {...ConfigUSD, currencyCode}
    case 'AUD': return {...ConfigAUD, currencyCode}
    case 'CAD': return {...ConfigCAD, currencyCode}
    case 'NZD': return {...ConfigNZD, currencyCode}
    case 'INR': return {...ConfigINR, currencyCode}
    case 'ISK': return {...ConfigISK, currencyCode}
    case 'THB': return {...ConfigTHB, currencyCode}
    default : return {...ConfigEUR, currencyCode: 'EUR'}
  }
}
