import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import './HomeBanner.scss'

class HomeBanner extends Component {
  render () {
    return (
      <div className='block block-banner'>
        <div className='container-fluid'>
          <Link to='/' className='block-banner__body'>
            <div
              className='block-banner__image block-banner__image--desktop'
              style={{ backgroundImage: 'url("/assets/img/banners/banner-1.jpg")' }}
            />
            <div
              className='block-banner__image block-banner__image--mobile'
              style={{ backgroundImage: 'url("/assets/img/banners/banner-1-mobile.jpg")' }}
            />
            <div className='block-banner__title'>
              Cocktail Dresses
            </div>
            <div className='block-banner__text'>
              The most beautiful finds for parties, <br /> weddings and premieres
            </div>
            <div className='block-banner__button'>
              <span className='btn btn-sm btn-primary'>Shop Now</span>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default injectIntl(HomeBanner)
