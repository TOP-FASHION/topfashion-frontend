import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './FooterContacts.messages.js'
import './FooterContacts.scss'

class FooterContacts extends Component {
  messages = setMessages(this, messages, 'app.footer.contacts.')

  render () {
    return (
      <div className='site-footer__widget footer-contacts'>
        <h5 className='footer-contacts__title'>{this.messages('title')}</h5>
        <ul className='footer-contacts__contacts'>
          <li>
            <i className='footer-contacts__icon fas fa-globe-americas' />
            {this.messages('address')}
          </li>
          <li>
            <i className='footer-contacts__icon far fa-envelope' />
            {this.messages('email')}
          </li>
          <li>
            <i className='footer-contacts__icon fas fa-mobile-alt' />
            {this.messages('phone')}
          </li>
          <li>
            <i className='footer-contacts__icon far fa-clock' />
            {this.messages('time')}
          </li>
        </ul>
      </div>
    )
  }
}

export default injectIntl(FooterContacts)
