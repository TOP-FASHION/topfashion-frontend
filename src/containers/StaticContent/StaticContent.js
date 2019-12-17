import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import Fragment from '../../components/Fragment'

class StaticContent extends Component {
  static propTypes = {
    content: PropTypes.string,
    className: PropTypes.string
  }

  get className () {
    return classNames('static-content', this.props.className)
  }

  content (content) {
    return (
      <div
        className={this.className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  render () {
    return (
      <Fragment>
        {this.content(placeholder(this.props.content, 'placeholders'))}
      </Fragment>
    )
  }
}

export default injectIntl(StaticContent)

function placeholder (text, data = {}) {
  return text.replace(/{([a-zA-Z0-9]+)}/g, (placeholder, placeholderId) => data.hasOwnProperty(placeholderId) ? data[placeholderId] : placeholder) // eslint-disable-line no-prototype-builtins
}
