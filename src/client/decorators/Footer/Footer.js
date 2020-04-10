import React from 'react'
import { injectIntl } from 'react-intl'
import FooterNewsletter from './FooterNewsletter'
import FooterContacts from './FooterContacts'
import FooterLinks from './FooterLinks'
import setMessages from '../../utils/setMessages'
import messages from './Footer.messages.js'
import './Footer.scss'

const Footer = (props) => {
  const message = setMessages(props, messages, 'app.footer.')

  const catalogLinks = [
    { title: message('catalog.new'), url: '/about-us' },
    { title: message('catalog.woman'), url: '/policy' },
    { title: message('catalog.man'), url: '/brands' },
    { title: message('catalog.perfume'), url: '/contact-us' },
    { title: message('catalog.accessource'), url: '/site-map' }
  ]

  const informationLinks = [
    { title: message('information.aboutUs'), url: '/about-us' },
    { title: message('information.policy'), url: '/policy' },
    { title: message('information.brands'), url: '/brands' },
    { title: message('information.contactUs'), url: '/contact-us' },
    { title: message('information.siteMap'), url: '/site-map' }
  ]

  const accountLinks = [
    { title: message('myAccount.storeLocation'), url: '/store-location' },
    { title: message('myAccount.orderHistory'), url: '/order-history' },
    { title: message('myAccount.wishList'), url: '/wishList' },
    { title: message('myAccount.newsletter'), url: '/newsletter' },
    { title: message('myAccount.specials'), url: '/specials' }
  ]

  return (
    <div className='site-footer'>
      <FooterNewsletter />
      <div className='container-fluid'>
        <div className='site-footer__widgets'>
          <div className='row'>
            <div className='col-12 col-md-4 col-lg-3'>
              <FooterLinks title={message('catalog.title')} items={catalogLinks} />
            </div>
            <div className='col-6 col-md-4 col-lg-3'>
              <FooterLinks title={message('information.title')} items={informationLinks} />
            </div>
            <div className='col-6 col-md-4 col-lg-3'>
              <FooterLinks title={message('myAccount.title')} items={accountLinks} />
            </div>
            <div className='col-12 col-md-12 col-lg-3'>
              <FooterContacts />
            </div>
          </div>
        </div>
        <div className='site-footer__bottom'>
          <div className='site-footer__copyright'>© 2020 Top-Fashion Все права защищены</div>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(Footer)
