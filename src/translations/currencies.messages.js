import { defineMessages } from 'react-intl'
import setMessages from '../utils/setMessages'

const currencies = defineMessages({
  'app.currencies.value': {
    id: 'app.currencies.value',
    defaultMessage: '{currency} {value}'
  },
  'app.currencies.USD': {
    id: 'app.currencies.USD',
    defaultMessage: '$'
  },
  'app.currencies.EUR': {
    id: 'app.currencies.EUR',
    defaultMessage: '€'
  },
  'app.currencies.BT1': {
    id: 'app.currencies.BT1',
    defaultMessage: 'µBTC'
  },
  'app.currencies.BT2': {
    id: 'app.currencies.BT2',
    defaultMessage: 'mBTC'
  },
  'app.currencies.BTC': {
    id: 'app.currencies.BTC',
    defaultMessage: 'BTC'
  },
  'app.currencies.GBP': {
    id: 'app.currencies.GBP',
    defaultMessage: '£'
  },
  'app.currencies.SEK': {
    id: 'app.currencies.SEK',
    defaultMessage: 'kr'
  },
  'app.currencies.BGN': {
    id: 'app.currencies.BGN',
    defaultMessage: 'BGN'
  },
  'app.currencies.CNY': {
    id: 'app.currencies.CNY',
    defaultMessage: '¥'
  },
  'app.currencies.IDR': {
    id: 'app.currencies.IDR',
    defaultMessage: 'IDR'
  },
  'app.currencies.AUD': {
    id: 'app.currencies.AUD',
    defaultMessage: 'AUD$'
  },
  'app.currencies.HUF': {
    id: 'app.currencies.HUF',
    defaultMessage: 'HUF'
  },
  'app.currencies.IRT': {
    id: 'app.currencies.IRT',
    defaultMessage: 'IRT'
  },
  'app.currencies.NOK': {
    id: 'app.currencies.NOK',
    defaultMessage: 'NOK'
  },
  'app.currencies.CAD': {
    id: 'app.currencies.CAD',
    defaultMessage: 'CAD'
  },
  'app.currencies.RUB': {
    id: 'app.currencies.RUB',
    defaultMessage: '₽'
  },
  'app.currencies.MXN': {
    id: 'app.currencies.MXN',
    defaultMessage: 'MXN$'
  },
  'app.currencies.WST': {
    id: 'app.currencies.WST',
    defaultMessage: 'WS$'
  },
  'app.currencies.TRY': {
    id: 'app.currencies.TRY',
    defaultMessage: '₤'
  },
  'app.currencies.HKD': {
    id: 'app.currencies.HKD',
    defaultMessage: 'HKD$'
  },
  'app.currencies.JPY': {
    id: 'app.currencies.JPY',
    defaultMessage: '¥'
  },
  'app.currencies.RON': {
    id: 'app.currencies.RON',
    defaultMessage: 'RON'
  },
  'app.currencies.DKK': {
    id: 'app.currencies.DKK',
    defaultMessage: 'DKK'
  },
  'app.currencies.MGA': {
    id: 'app.currencies.MGA',
    defaultMessage: 'Ar'
  },
  'app.currencies.XAF': {
    id: 'app.currencies.XAF',
    defaultMessage: 'XAF'
  }
})

export function setCurrencies (target) {
  const messages = setMessages(target, currencies, 'app.currencies.')
  return (...args) => {
    if (args[0] === 'value') {
      args[1].value = Number.parseFloat(args[1].value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
    return messages(...args)
  }
}

export default currencies
