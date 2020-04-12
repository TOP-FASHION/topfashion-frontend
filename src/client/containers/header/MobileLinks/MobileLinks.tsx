import * as React from 'react'
import { NavLink } from 'react-router-dom'
import Collapse from '../../../components/Collapse'
import './MobileLinks.scss'

interface Props {
  links?: Array<any>,
  level?: number,
  onItemClick: Function
}

function MobileLinks ({ links = [], level = 0, onItemClick = () => {} }: Props) {
  const handleItemClick = (item: any) => {
    if (onItemClick) {
      onItemClick(item)
    }
  }

  const linksList = links.map((link: any, index) => {
    let item

    if (link.type === 'link' || link.type === 'button') {
      item = (
        <Collapse
          toggleClass='mobile-links__item--open'
          // @ts-ignore
          render={({ toggle, setItemRef, setContentRef }) => {
            let arrow
            let subLinks
            let linkOrButton

            if (link.children && link.children.length > 0) {
              arrow = (
                <button className='mobile-links__item-toggle' type='button' onClick={toggle}>
                  <i className='mobile-links__item-arrow fas fa-angle-down' />
                </button>
              )

              subLinks = (
                <div className='mobile-links__item-sub-links' ref={setContentRef}>
                  <MobileLinks
                    links={link.children}
                    level={level + 1}
                    onItemClick={onItemClick}
                  />
                </div>
              )
            }

            if (link.type === 'link') {
              linkOrButton = (
                <NavLink
                  to={link.url}
                  className='mobile-links__item-link'
                  onClick={() => handleItemClick(link)}
                >
                  {link.label}
                </NavLink>
              )
            } else {
              linkOrButton = (
                <button
                  type='button'
                  className='mobile-links__item-link'
                  onClick={() => handleItemClick(link)}
                >
                  {link.label}
                </button>
              )
            }

            return (
              <div className='mobile-links__item' ref={setItemRef}>
                <div className='mobile-links__item-title'>
                  {linkOrButton}
                  {arrow}
                </div>
                {subLinks}
              </div>
            )
          }}
        />
      )
    } else if (link.type === 'divider') {
      item = <div className='mobile-links__divider' />
    }

    return <li key={index}>{item}</li>
  })

  return (
    <ul className={`mobile-links mobile-links--level--${level}`}>
      {linksList}
    </ul>
  )
}

export default MobileLinks
