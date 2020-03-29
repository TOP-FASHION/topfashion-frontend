import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

class Body extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string),
    state: PropTypes.object,
    noScriptText: PropTypes.string,
    html: PropTypes.node
  }

  static defaultProps = {
    className: '',
    html: null,
    noScriptText: ''
  }

  render () {
    const { className, scripts, state, noScriptText, html } = this.props

    return (
      <body className={`initializing preloading ${className}`.trim()}>
        <noscript>{noScriptText}</noscript>
        <div id='root' dangerouslySetInnerHTML={{ __html: html }} />
        <div id='preloader' />
        <AppScripts list={scripts} state={state} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Unset initial styling
          document.body.classList.remove('initializing')
        `
          }}
        />
      </body>
    )
  }
}

class AppScripts extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    state: PropTypes.object
  }

  static defaultProps = {
    list: [],
    state: {}
  }

  render () {
    return (
      <React.Fragment>
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `window.__data=${serialize(this.props.state)};`
          }}
          charSet='UTF-8'
        />
        {this.props.list.map(name => (
          <script
            type='text/javascript'
            src={`/${name}`}
            key={name}
            charSet='UTF-8'
          />
        ))}
      </React.Fragment>
    )
  }
}

export default Body
