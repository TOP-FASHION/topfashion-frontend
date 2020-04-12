import * as React from 'react'
import { Link } from 'react-router-dom'
import NavLinks from '../NavLinks'
import { observer } from 'mobx-react'
import './NavPanel.scss'

interface Props {
  layout?: 'default' | 'compact'
}

const NavPanel = observer(({ layout = 'default' }: Props) => {
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
      <div className='nav-panel__container'>
        <div className='nav-panel__row'>
          {logo}
          <div className='nav-panel__nav-links nav-links'>
            <NavLinks />
          </div>
        </div>
      </div>
    </div>
  )
})

export default NavPanel
