import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Loading extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  get className () {
    return classNames('seedLoading', this.props.className)
  }

  render () {
    return (
      <h4 className={this.className}>
        Загрузка
      </h4>
    )
  }
}
