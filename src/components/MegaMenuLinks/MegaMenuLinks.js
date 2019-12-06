import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function MegaMenuLinks (props) {
  const { links, depth } = props

  const linksList = links.map((link, index) => {
    let title = null
    let subLinks = null

    if (link.title) {
      title = <Link to={link.url}>{link.title}</Link>
    }

    if (link.links && link.links.length) {
      subLinks = <MegaMenuLinks links={link.links} depth={depth + 1} />
    }

    const classes = classNames('megamenu__item', {
      'megamenu__item--with-submenu': subLinks
    })

    return (
      <li key={index} className={classes}>
        {title}
        {subLinks}
      </li>
    )
  })

  return (
    <ul className={`megamenu__links megamenu__links--level--${depth}`}>
      {linksList}
    </ul>
  )
}

MegaMenuLinks.propTypes = {
  links: PropTypes.array,
  depth: PropTypes.number
}

MegaMenuLinks.defaultProps = {
  depth: 0
}

export default MegaMenuLinks
