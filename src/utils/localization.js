import locales from '../locales';

const getLanguageMessages = () => {
  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language =
    (navigator.languages && navigator.languages[0]) || navigator.language;

  // Split locales with a region code
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

  // Try full locale, try locale without region code, fallback to 'en'
  const messages =
    locales[languageWithoutRegionCode] || locales[language] || locales.en;

  return { language, messages };
};

export default getLanguageMessages;
