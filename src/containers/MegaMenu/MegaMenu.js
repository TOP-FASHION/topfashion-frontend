import React from 'react'
import PropTypes from 'prop-types'
import MegaMenuLinks from '../../components/MegaMenuLinks'
import './MegaMenu.scss'

function MegaMenu (props) {
  const { menu, location } = props

  if (!menu) {
    return []
  }

  const menuStyle = {
    backgroundImage: menu.image ? `url('${menu.image}')` : ''
  }

  const columns = menu.columns.map((column, index) => (
    <div key={index} className={`col-${column.size}`}>
      <MegaMenuLinks links={column.links} />
    </div>
  ))

  return (
    <div className={`megamenu megamenu--${location}`} style={menuStyle}>
      <div className='row'>
        {columns}
      </div>
    </div>
  )
}

MegaMenu.propTypes = {
  /** menu object (required) */
  menu: PropTypes.object,
  /** one of ['nav-links', 'department'] (default: 'nav-links') */
  location: PropTypes.oneOf(['nav-links', 'department'])
}

MegaMenu.defaultProps = {
  location: 'nav-links'
}

export default MegaMenu
