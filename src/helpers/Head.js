import React from 'react'
import PropTypes from 'prop-types'

class Head extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    languages: PropTypes.array,
    siteName: PropTypes.string,
    siteDescription: PropTypes.string
  }

  static defaultProps = {
    url: 'localhost',
    languages: ['en'],
    siteName: '',
    siteDescription: ''
  }

  render () {
    const {url, languages, siteName, siteDescription} = this.props
    const placeholderedUrl = putLanguagePlaceholderInUrl(url, languages)

    // Compose alternate links for search bots
    const alternateLinks = languages.map(lang => (
      <link key={lang} rel='alternate' hrefLang={lang} href={placeholderedUrl.replace('{{LANG}}', lang)} />
    ))

    // Default alternate link
    alternateLinks.push(
      <link key='x-default' rel='alternate' hrefLang='x-default' href={placeholderedUrl.replace('/{{LANG}}', '')} />
    )

    return (
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='194x194' href='/favicon-194x194.png' />
        <link rel='icon' type='image/png' sizes='192x192' href='/android-chrome-192x192.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        {alternateLinks}
        <meta name='apple-mobile-web-app-title' content={siteName} />
        <meta name='application-name' content={siteName} />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
        <title>{siteName}</title>
        <meta name='description' content={siteDescription} />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Initial styling */
          body.initializing,body.preloading {
            overflow: hidden;
          }
          body.initializing:after,body.preloading:after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url(/cms/img/logo.svg) center center / 250px no-repeat #fff;
            z-index: 99999;
          }
        `}} />
      </head>
    )
  }
}

export default Head

function putLanguagePlaceholderInUrl (url = '', languages = []) {
  const regexp = new RegExp(`^(https?://[^/?#]+)(?:/(?:${languages.join('|')}))?(?=[/?#]|$)`)
  return url.replace(regexp, '$1/{{LANG}}')
}
