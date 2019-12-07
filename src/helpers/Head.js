import React from 'react'
import PropTypes from 'prop-types'
import initialStyles from './Head.scss'

class Head extends React.Component {
  static propTypes = {
    siteName: PropTypes.string,
    siteDescription: PropTypes.string,
    stylesheets: PropTypes.array
  }

  static defaultProps = {
    siteName: '',
    siteDescription: ''
  }

  render () {
    const { siteName, siteDescription, stylesheets } = this.props

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
        <meta name='apple-mobile-web-app-title' content={siteName} />
        <meta name='application-name' content={siteName} />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
        <title>{siteName}</title>
        <meta name='description' content={siteDescription} data-react-helmet='true' />
        <style dangerouslySetInnerHTML={{ __html: initialStyles }} />
        <AppStylesheets list={stylesheets} />
      </head>
    )
  }
}

class AppStylesheets extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    list: []
  }

  render () {
    return (
      <React.Fragment>
        {this.props.list.map(name => (
          <link rel='stylesheet' href={`/${name}`} key={name} />
        ))}
      </React.Fragment>
    )
  }
}

export default Head
