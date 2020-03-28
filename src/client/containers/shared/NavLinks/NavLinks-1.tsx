import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import AppLink from '../../../components/AppLink'
import Menu from '../Menu'
import { GET_MENU } from '../../../queries/menu'
import './NavLinks.scss'

interface IMenuProps {
  menu: any;
  match: string;
}

type TParam = RouteComponentProps<any>

const NavLinks = ({ match }: TParam) => {
  const { loading, data, error } = useQuery<IMenuProps>(GET_MENU)

  if (loading) return null
  if (!data) return null
  if (error) return null

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

  const linksList = data.menu.menuItems.edges.map((item, index) => {
    let arrow
    let submenu

    if (item.node.childItems.nodes.length > 0) {
      arrow = <i className='fa fa-angle-down ml-2 opacity-5 nav-links__arrow' />
    }

    if (item.node.childItems.nodes.length > 0) {
      // item.child_items.map((item, index) => {
      //   item.title = this.messages(item.title)
      // })

      submenu = (
        <div className='nav-links__menu'>
          <Menu items={item.node.childItems.nodes} />
        </div>
      )
    }
    // if (item.submenu && item.submenu.type === 'megamenu') {
    //   submenu = (
    //     <div className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}>
    //       <MegaMenu menu={item.submenu.menu} />
    //     </div>
    //   )
    // }
    //

    const classes = classNames('nav-links__item', {
      'nav-links__item--current': match.params.categoryId === item.node.label.toLowerCase(),
      'nav-links__item--with-submenu': item.node.childItems.nodes.length > 0
    })

    return (
      <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
        <AppLink to={`/category/${item.node.label.toLowerCase()}`} {...item.props}>
          <span>
            {item.node.label}
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

export default withRouter(NavLinks)
