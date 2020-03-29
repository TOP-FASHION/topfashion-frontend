import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import FooterNewsletter from './FooterNewsletter'
import FooterSocial from './FooterSocial'
import FooterContacts from './FooterContacts'
import FooterLinks from './FooterLinks'
import setMessages from '../../utils/setMessages'
import messages from './Footer.messages.js'
import './Footer.scss'

class Footer extends Component {
  messages = setMessages(this, messages, 'app.footer.')

  informationLinks = [
    { title: this.messages('information.aboutUs'), url: '/about-us' },
    { title: this.messages('information.policy'), url: '/policy' },
    { title: this.messages('information.brands'), url: '/brands' },
    { title: this.messages('information.contactUs'), url: '/contact-us' },
    { title: this.messages('information.siteMap'), url: '/site-map' }
  ]

  accountLinks = [
    { title: this.messages('myAccount.storeLocation'), url: '/store-location' },
    { title: this.messages('myAccount.orderHistory'), url: '/order-history' },
    { title: this.messages('myAccount.wishList'), url: '/wishList' },
    { title: this.messages('myAccount.newsletter'), url: '/newsletter' },
    { title: this.messages('myAccount.specials'), url: '/specials' }
  ]

  render () {
    return (
      <div className='site-footer'>
        <div className='container-fluid'>
          <FooterNewsletter />
          <div className='site-footer__widgets'>
            <div className='row'>
              <div className='col-12 col-md-6 col-lg-4'>
                <FooterSocial />
              </div>
              <div className='col-6 col-md-3 col-lg-2'>
                <FooterLinks title={this.messages('information.title')} items={this.informationLinks} />
              </div>
              <div className='col-6 col-md-3 col-lg-2'>
                <FooterLinks title={this.messages('myAccount.title')} items={this.accountLinks} />
              </div>
              <div className='col-12 col-md-12 col-lg-4'>
                <FooterContacts />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Footer)
