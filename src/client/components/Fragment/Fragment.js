import React from 'react'
import PropTypes from 'prop-types'

class Fragment extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    // TODO: remove 'show' property before major release
    show: PropTypes.bool,
    // TODO: remove 'hide' property before major release
    hide: PropTypes.bool,
    children: PropTypes.any
  }

  get children () {
    const { children } = this.props
    return typeof children === 'function' ? children() : children
  }

  get isShown () {
    if (this.props.hasOwnProperty('hidden')) { // eslint-disable-line no-prototype-builtins
      return !this.props.hidden
    }
    if (this.props.hasOwnProperty('show')) { // eslint-disable-line no-prototype-builtins
      return this.props.show
    }
    if (this.props.hasOwnProperty('hide')) { // eslint-disable-line no-prototype-builtins
      return !this.props.hide
    }
    return true
  }

  render () {
    return this.isShown && typeof this.children !== 'undefined'
      ? this.children
      : null
  }
}

export default Fragment
