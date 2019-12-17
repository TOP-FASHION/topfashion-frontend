import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppLink from '../../components/AppLink'
import MegaMenu from '../MegaMenu'
import Menu from '../Menu'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './NavLinks.messages'
import { observer, inject } from 'mobx-react'
import './NavLinks.scss'

@inject('menuStore')
@observer
class NavLinks extends Component {
  static propTypes = {
    menuStore: PropTypes.any.isRequired
  }

  messages = setMessages(this, messages, 'app.nav.link.')

  componentDidMount () {
    this.props.menuStore.getMenu()
  }

  handleMouseEnter = (event) => {
    const item = event.currentTarget
    const megamenu = item.querySelector('.nav-links__megamenu')

    if (megamenu) {
      const container = megamenu.offsetParent
      const containerWidth = container.getBoundingClientRect().width
      const megamenuWidth = megamenu.getBoundingClientRect().width
      const itemOffsetLeft = item.offsetLeft
      const megamenuPosition = Math.round(
        Math.min(itemOffsetLeft, containerWidth - megamenuWidth)
      )

      megamenu.style.left = `${megamenuPosition}px`
    }
  }

  get linksList () {
    return this.props.menuStore.menu ? this.props.menuStore.menu.map((item, index) => {
      let arrow
      let submenu

      if (item.child_items) {
        arrow = <i className='fa fa-angle-down ml-2 opacity-5 nav-links__arrow' />
      }

      if (item.child_items) {
        // item.child_items.map((item, index) => {
        //   item.title = this.messages(item.title)
        // })

        submenu = (
          <div className='nav-links__menu'>
            <Menu items={item.child_items} />
          </div>
        )
      }

      if (item.submenu && item.submenu.type === 'megamenu') {
        submenu = (
          <div className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}>
            <MegaMenu menu={item.submenu.menu} />
          </div>
        )
      }

      const classes = classNames('nav-links__item', {
        'nav-links__item--with-submenu': item.submenu
      })

      return (
        <li key={index} className={classes} onMouseEnter={this.handleMouseEnter}>
          <AppLink to={item.post_name} {...item.props}>
            <span>
              {item.title}
              {arrow}
            </span>
          </AppLink>
          {submenu}
        </li>
      )
    }) : null
  }

  render () {
    return (
      <ul className='nav-links__list'>
        {this.linksList}
      </ul>
    )
  }
}

export default injectIntl(NavLinks)
