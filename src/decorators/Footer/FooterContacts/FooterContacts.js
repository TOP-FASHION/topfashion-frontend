import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from '../Footer.messages.js'
import './FooterContacts.scss'

class FooterContacts extends Component {
  messages = setMessages(this, messages, 'app.footer.')

  render() {
    return (
      <div className="site-footer__widget footer-contacts">
        <h5 className="footer-contacts__title">{this.messages('contacts.title')}</h5>
        <div className="footer-contacts__text">
          {this.messages('contacts.text')}
        </div>
        <ul className="footer-contacts__contacts">
          <li>
            <i className="footer-contacts__icon fas fa-globe-americas" />
            {this.messages('contacts.address')}
          </li>
          <li>
            <i className="footer-contacts__icon far fa-envelope" />
            {this.messages('contacts.email')}
          </li>
          <li>
            <i className="footer-contacts__icon fas fa-mobile-alt" />
            {this.messages('contacts.phone')}
          </li>
          <li>
            <i className="footer-contacts__icon far fa-clock" />
            {this.messages('contacts.time')}
          </li>
        </ul>
      </div>
    )
  }
}

export default injectIntl(FooterContacts)
