import React, { Component } from 'react'
import classNames from 'classnames'
import AppLink from '../../components/AppLink/index'
import MegaMenu from '../MegaMenu/index'
import Menu from '../Menu/index'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './NavLinks.messages'
import './NavLinks.scss'

class NavLinks extends Component {
  messages = setMessages(this, messages, 'app.nav.link.')

  navLinks = [
    {
      title: 'New',
      url: '/category/new'
    },
    {
      title: 'Dress',
      url: '/category/dress',
      submenu: {
        type: 'menu',
        menu: [
          {
            title: 'Party dresses',
            url: '/category/party',
            submenu: [
              { title: 'Party 1', url: '/category/1' },
              { title: 'Party 2', url: '/category/2' },
              { title: 'Party 3', url: '/category/3' }
            ]
          },
          { title: 'Party 4', url: '/category/dress' },
          { title: 'Party 5', url: '/category/dress' },
          { title: 'Party 6', url: '/category/dress' },
          { title: 'Party 7', url: '/category/dress' },
          { title: 'Party 8', url: '/category/dress' }
        ]
      }
    },
    {
      title: 'Sets',
      url: '/category/sets',
      submenu: {
        type: 'menu',
        menu: [
          { title: 'Sets 4', url: '/category/dress' },
          { title: 'Sets 5', url: '/category/dress' },
          { title: 'Sets 6', url: '/category/dress' },
          { title: 'Sets 7', url: '/category/dress' },
          { title: 'Sets 8', url: '/category/dress' }
        ]
      }
    },
    {
      title: 'shoes',
      url: '/category/shoes',
      submenu: {
        type: 'menu',
        menu: [
          { title: 'Shoes 4', url: '/category/shoes' },
          { title: 'Shoes 5', url: '/category/shoes' },
          { title: 'Shoes 6', url: '/category/shoes' },
          { title: 'Shoes 7', url: '/category/shoes' },
          { title: 'Shoes 8', url: '/category/shoes' }
        ]
      }
    },
    {
      title: 'Greatcoat',
      url: '/category/greatcoat',
      submenu: {
        type: 'menu',
        menu: [
          { title: 'Greatcoat 4', url: '/category/greatcoat' },
          { title: 'Greatcoat 5', url: '/category/greatcoat' },
          { title: 'Greatcoat 6', url: '/category/greatcoat' },
          { title: 'Greatcoat 7', url: '/category/greatcoat' },
          { title: 'Greatcoat 8', url: '/category/greatcoat' }
        ]
      }
    },
    {
      title: 'Accessories',
      url: '/category/greatcoat',
      submenu: {
        type: 'menu',
        menu: [
          { title: 'Accessories 4', url: '/category/greatcoat' },
          { title: 'Accessories 5', url: '/category/greatcoat' },
          { title: 'Accessories 6', url: '/category/greatcoat' },
          { title: 'Accessories 7', url: '/category/greatcoat' },
          { title: 'Accessories 8', url: '/category/greatcoat' }
        ]
      }
    }
  ];

  render () {
    //console.log('links', Links.Links)
    const handleMouseEnter = (event) => {
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

    const linksList = this.navLinks.map((item, index) => {
      let arrow
      let submenu

      if (item.submenu) {
        arrow = <i className='fa fa-angle-down ml-2 opacity-5 nav-links__arrow'></i>;
      }

      if (item.submenu && item.submenu.type === 'menu') {
        submenu = (
          <div className='nav-links__menu'>
            <Menu items={item.submenu.menu} />
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
        <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
          <AppLink to={item.url} {...item.props}>
            <span>
              {item.title}
              {arrow}
            </span>
          </AppLink>
          {submenu}
        </li>
      )
    })
    return (
      <ul className='nav-links__list'>
        {linksList}
      </ul>
    )
  }
}

export default injectIntl(NavLinks)
