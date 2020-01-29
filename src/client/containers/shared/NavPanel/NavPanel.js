import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NavLinks from '../NavLinks'
import { observer } from 'mobx-react'
import './NavPanel.scss'

@observer
class NavPanel extends Component {
  static propTypes = {
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact'])
  }

  static defaultProps = {
    layout: 'default'
  }

  render () {
    const { layout } = this.props
    let logo = null

    if (layout === 'compact') {
      logo = (
        <div className='nav-panel__logo'>
          <Link to='/'>Logo</Link>
        </div>
      )
    }

    return (
      <div className='nav-panel'>
        <div className='nav-panel__container container'>
          <div className='nav-panel__row'>
            {logo}
            <div className='nav-panel__nav-links nav-links'>
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavPanel
