import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class FailedImport extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  get className () {
    return classNames('failed-import__root', this.props.className)
  }

  render () {
    return <span className={this.className}>Нет файла</span>
  }
}

export default FailedImport
