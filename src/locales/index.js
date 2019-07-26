import en from './en'

export const supportedLanguages = ['en']

const getLocale = localeInput => {
  if (localeInput.length === 2) {
    return supportedLanguages.indexOf(localeInput) !== -1
      ? localeInput
      : supportedLanguages[0]
  }
  if (
    localeInput.length > 2 &&
    supportedLanguages.indexOf(localeInput.split(/-\w{2,}/)[0]) !== -1
  ) {
    return localeInput.split(/-\w{2,}/)[0]
  }
  return supportedLanguages[0]
}

let lang = supportedLanguages[0]

if (typeof window !== 'undefined' && window.localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang')
} else if (global.navigator) lang = getLocale(global.navigator.language)

export const locale = lang

const mapping = {
  en
}

export const formatMessage = id => {
  return mapping[locale][id]
}

export default mapping
