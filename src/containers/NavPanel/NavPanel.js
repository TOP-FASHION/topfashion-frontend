import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Departments from '../../components/Departments'
import NavLinks from '../../components/NavLinks'
import Indicator from '../../components/Indicator'
import IndicatorCart from '../../components/IndicatorCart'
import IndicatorSearch from '../../components/IndicatorSearch'
import './NavPanel.scss'

function NavPanel (props) {
  const { layout } = props

  let logo = null
  let departments = null
  let searchIndicator

  if (layout === 'compact') {
    logo = (
      <div className='nav-panel__logo'>
        <Link to='/'>Logo</Link>
      </div>
    )

    searchIndicator = <IndicatorSearch />
  }

  if (layout === 'default') {
    departments = (
      <div className='nav-panel__departments'>
        <Departments />
      </div>
    )
  }

  return (
    <div className='nav-panel'>
      <div className='nav-panel__container container'>
        <div className='nav-panel__row'>
          {logo}
          {departments}

          <div className='nav-panel__nav-links nav-links'>
            <NavLinks />
          </div>

          <div className='nav-panel__indicators'>
            {/* {searchIndicator} */}
            <Indicator
              url='/shop/wishlist'
              value={10}
              icon={<i className='far fa-heart' />}
            />
            <IndicatorCart />
          </div>
        </div>
      </div>
    </div>
  )
}

NavPanel.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(['default', 'compact'])
}

NavPanel.defaultProps = {
  layout: 'default'
}

export default NavPanel
