import React from 'react'
import PropTypes from 'prop-types'
import warn from '../utils/warn'

class Fragment extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    // TODO: remove 'show' property before major release
    show: PropTypes.bool,
    // TODO: remove 'hide' property before major release
    hide: PropTypes.bool,
    children: PropTypes.any
  }

  componentWillMount () {
    if (this.props.hasOwnProperty('show')) {
      warn('Property `show` has been deprecated, use `hidden` instead.')
    }
    if (this.props.hasOwnProperty('hide')) {
      warn('Property `hide` has been deprecated, use `hidden` instead.')
    }
  }

  get children () {
    const {children} = this.props
    return typeof children === 'function' ? children() : children
  }

  get isShown () {
    if (this.props.hasOwnProperty('hidden')) {
      return !this.props.hidden
    }
    if (this.props.hasOwnProperty('show')) {
      return this.props.show
    }
    if (this.props.hasOwnProperty('hide')) {
      return !this.props.hide
    }
    return true
  }

  render () {
    return this.isShown && typeof this.children !== 'undefined' ? this.children : null
  }
}

export default Fragment
