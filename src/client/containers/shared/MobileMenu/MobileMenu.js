import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import MobileLinks from '../MobileLinks'
import './MobileMenu.scss'

import menuLinks from '../../../settings/menuLinks'

@inject('mobileMenuStore')
@observer
class MobileMenu extends Component {
  static propTypes = {
    mobileMenuStore: PropTypes.any,
    intl: PropTypes.object
  }

  render () {
    const { intl } = this.props
    const { locale } = intl
    // TODO
    const onChange = value => {
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
      'mobilemenu--open': this.props.mobileMenuStore.isOpenMobileMenu
    })

    const handleItemClick = (item) => {
      if (item.data) {
        if (item.data.type === 'language') {
          onChange(item.data.locale)
          this.props.mobileMenuStore.closeMobileMenu()
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
  }
}

export default injectIntl(MobileMenu)
