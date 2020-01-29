import React from 'react'
import PropTypes from 'prop-types'

class Group extends React.Component {
  static propTypes = {
    classNames: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    classNames: {}
  }

  render () {
    const { classNames, children, ...otherProps } = this.props
    return (
      <div className={classNames.root} {...otherProps}>
        {children}
      </div>
    )
  }
}

export default Group
