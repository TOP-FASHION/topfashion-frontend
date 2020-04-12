import * as React from 'react'
import { observer } from 'mobx-react'
// @ts-ignore
import { injectIntl } from 'react-intl'
import { AppContext } from '../../../core/Store/context'
import classNames from 'classnames'
import MobileLinks from '../MobileLinks'
import './MobileMenu.scss'

import menuLinks from '../../../settings/menuLinks'

const MobileMenu = observer((props: any) => {
  const { mobileMenuStore } = React.useContext(AppContext)
  const { locale } = props.intl
  // TODO
  const onChange = (value: any) => {
    const urlParts = window.location.href.split(/(\/|\?)/)
    // If there is locale on url like /en/games - then just change en to new locale
    if (urlParts && urlParts[6] === locale) {
      urlParts[6] = value

      // Otherwise (f.e. /games) add new locale before route (f.e. /ru/games)
    } else {
      // Do not add trailing slash on urls like /en, /ru, etc. if no urlParts[3] given
      urlParts[6] = urlParts[6] ? `${value}/${urlParts[6]}` : value
    }

    const url = urlParts.join('')
    window.location.href = url.endsWith('/') ? url.slice(0, -1) : url
  }

  const classes = classNames('mobilemenu', {
    'mobilemenu--open': mobileMenuStore.isOpenMobileMenu
  })

  const handleItemClick = (item: any) => {
    if (item.data) {
      if (item.data.type === 'language') {
        onChange(item.data.locale)
        mobileMenuStore.closeMobileMenu()
      }
    }
  }

  return (
    <div className={classes}>
      <div className='mobilemenu__body'>
        <div className='mobilemenu__content'>
          <MobileLinks links={menuLinks} onItemClick={handleItemClick} />
        </div>
      </div>
    </div>
  )
})

export default injectIntl(MobileMenu)
