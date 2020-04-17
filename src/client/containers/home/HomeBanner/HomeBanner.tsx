import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import './HomeBanner.scss'

const HomeBanner = (props: any) => {
  return (
    <div className='block block-banner'>
      <div className='container-fluid'>
        <Link to='/' className='block-banner__body'>
          <picture>
            <source className='block-banner__image block-banner__image--mobile' srcSet='/assets/img/banners/banner-1-mobile.jpg' media='(max-width: 550px)' />
            <img className='block-banner__image block-banner__image--desktop' src='/assets/img/banners/banner-1.jpg' />
          </picture>
        </Link>
      </div>
    </div>
  )
}

export default injectIntl(HomeBanner)
