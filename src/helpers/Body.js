import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

class Body extends React.Component {
  static propTypes = {
    scripts: PropTypes.array,
    stylesheets: PropTypes.array,
    cssHash: PropTypes.object,
    state: PropTypes.object,
    html: PropTypes.node
  }

  static defaultProps = {
    html: null
  }

  render () {
    const {scripts, stylesheets, cssHash, html, state} = this.props

    return (
      <body className='initializing'>
        <div id='root' dangerouslySetInnerHTML={{ __html: html }} />
        <div id='preloader' />
        <AppScripts list={scripts} state={state} cssHash={cssHash} />
        <AppStylesheets list={stylesheets} />
        <script dangerouslySetInnerHTML={{ __html: `
          // Unset initial styling
          const body = document.body;
          body.className = body.className.replace(/\\binitializing\\b/, '')
        `}} />
      </body>
    )
  }
}

class AppScripts extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    cssHash: PropTypes.object,
    state: PropTypes.object
  }

  static defaultProps = {
    list: [],
    cssHash: {},
    state: {}
  }

  render () {
    return (
      <React.Fragment>
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(this.props.state)};` }}
          charSet='UTF-8'
        />
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{ __html: `window.__CSS_CHUNKS__=${serialize(this.props.cssHash)};` }}
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
          <link
            rel='stylesheet'
            href={`/${name}`}
            key={name}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default Body
