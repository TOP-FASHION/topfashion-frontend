import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import './HomeBanner.scss'

class HomeBanner extends Component {
  render () {
    return (
      <div className='block block-banner'>
        <div className='container'>
          <Link to='/' className='block-banner__body'>
            <div
              className='block-banner__image block-banner__image--desktop'
              style={{ backgroundImage: 'url("/public/img/banners/banner-1.jpg")' }}
            />
            <div
              className='block-banner__image block-banner__image--mobile'
              style={{ backgroundImage: 'url("/public/img/banners/banner-1-mobile.jpg")' }}
            />
            <div className='block-banner__title'>
              Hundreds
              <br className='block-banner__mobile-br' />
              Hand Tools
            </div>
            <div className='block-banner__text'>
              Hammers, Chisels, Universal Pliers
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
