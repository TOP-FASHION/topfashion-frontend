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
    { title: this.messages('information.aboutUs'), url: '' },
    { title: this.messages('information.policy'), url: '' },
    { title: this.messages('information.brands'), url: '' },
    { title: this.messages('information.contactUs'), url: '' },
    { title: this.messages('information.siteMap'), url: '' }
  ]

  accountLinks = [
    { title: this.messages('myAccount.storeLocation'), url: '' },
    { title: this.messages('myAccount.orderHistory'), url: '' },
    { title: this.messages('myAccount.wishList'), url: '' },
    { title: this.messages('myAccount.newsletter'), url: '' },
    { title: this.messages('myAccount.specials'), url: '' }
  ]

  render () {
    return (
      <div className='site-footer'>
        <div className='container'>
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
