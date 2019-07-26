import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class CenterContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
  }

  get className() {
    return classNames('center-content', this.props.className)
  }

  render() {
    return <div className={this.className}>{this.props.children}</div>
  }
}
