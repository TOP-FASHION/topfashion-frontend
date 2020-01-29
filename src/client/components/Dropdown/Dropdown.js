import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Menu from '../../containers/shared/Menu'
import './Dropdown.scss'

class Dropdown extends Component {
  static propTypes = {
    /** title */
    title: PropTypes.node.isRequired,
    /** array of menu items */
    items: PropTypes.array.isRequired,
    /** default: false */
    withIcons: PropTypes.bool,
    /** callback function that is called when the item is clicked */
    onClick: PropTypes.func
  };

  static defaultProps = {
    withIcons: false,
    onClick: undefined
  };

  state = {
    open: false
  };

  componentDidMount () {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  };

  handleOutsideClick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(() => ({
        open: false
      }))
    }
  };

  handleButtonClick = () => {
    this.setState(state => ({
      open: !state.open
    }))
  };

  handleItemClick = (item) => {
    const { onClick } = this.props

    this.setState(() => ({
      open: false
    }))

    if (onClick) {
      onClick(item)
    }
  };

  render () {
    const { open } = this.state
    const { title, withIcons, items } = this.props

    const classes = classNames('dropdown', {
      'dropdown--opened': open
    })

    return (
      <div className={classes} ref={this.setWrapperRef}>
        <button className='dropdown__btn' type='button' onClick={this.handleButtonClick}>
          {title}
          <i className='fa fa-angle-down ml-2 opacity-5' />
        </button>

        <div className='dropdown__body'>
          <Menu
            layout='topbar'
            withIcons={withIcons}
            items={items}
            onClick={this.handleItemClick}
          />
        </div>
      </div>
    )
  }
}

export default Dropdown
