import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './FooterSocial.messages'
import './FooterSocial.scss'

class FooterSocial extends Component {
  messages = setMessages(this, messages, 'app.footer.social.')

  render () {
    return (
      <div className='site-footer__widget footer-social'>
        <h5 className='footer-social__title'>{this.messages('title')}</h5>

        <div className='footer-contacts__text'>
          {this.messages('text')}
        </div>
      </div>
    )
  }
}

export default injectIntl(FooterSocial)
