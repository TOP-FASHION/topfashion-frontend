import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CircularProgress } from 'material-ui/Progress'
import CenterContent from '../CenterContent'

export default class Loading extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  get className() {
    return classNames('seedLoading', this.props.className)
  }

  render() {
    return (
      <CenterContent>
        <h4 className={this.className}>
          <CircularProgress className="loading-spinner" />
        </h4>
      </CenterContent>
    )
  }
}
