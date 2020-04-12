import * as React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import Menu from '../Menu'
// @ts-ignore
import { injectIntl } from 'react-intl'
// import setMessages from '../../../utils/setMessages'
// import messages from './NavLinks.messages'
import './NavLinks.scss'

import menuLinks from '../../../settings/menuLinks'

const NavLinks = (props: any) => {
  // const message = setMessages(props, messages, 'app.nav.link.')

  const handleMouseEnter = (event: any) => {
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

  const linksList = menuLinks.map((item: any, index: any) => {
    if (item.type === 'link') {
      let arrow
      let submenu: any

      if (item.children) {
        arrow = <i className='fa fa-angle-down ml-2 opacity-5 nav-links__arrow' />
      }

      if (item.children) {
        submenu = (
          <div className='nav-links__menu'>
            <Menu items={item.children} />
          </div>
        )
      }

      const classes = classNames('nav-links__item', {
        'nav-links__item--with-submenu': item.submenu
      })

      return (
        <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
          <NavLink to={item.url} {...item.props}>
            <span>
              {item.label}
              {arrow}
            </span>
          </NavLink>
          {submenu}
        </li>
      )
    }
  })
  return (
    <ul className='nav-links__list'>
      {linksList}
    </ul>
  )
}

export default injectIntl(NavLinks)
