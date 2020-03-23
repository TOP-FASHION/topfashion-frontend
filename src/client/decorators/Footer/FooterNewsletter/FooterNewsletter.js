import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './FooterNewsletter.messages'
import './FooterNewsletter.scss'

class FooterNewsletter extends Component {
  messages = setMessages(this, messages, 'app.footer.newsletter.')

  socialLinks = [
    {
      key: 'facebook',
      url: '/',
      iconClass: 'fab fa-facebook-f'
    },
    {
      key: 'twitter',
      url: '/',
      iconClass: 'fab fa-twitter'
    },
    {
      key: 'youtube',
      url: '/',
      iconClass: 'fab fa-youtube'
    },
    {
      key: 'instagram',
      url: '/',
      iconClass: 'fab fa-instagram'
    }
  ];

  get socialLinksList () {
    return this.socialLinks.map((item) => (
      <li key={item.key} className={`footer-social__social-link footer-social__social-link--${item.key}`}>
        <a href={item.url} target='_blank' rel='noopener noreferrer'>
          <i className={item.iconClass} />
        </a>
      </li>
    ))
  }

  render () {
    return (
      <div className='site-footer__widget footer-newsletter'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <form action='' className='footer-newsletter__form'>
              <label className='sr-only' htmlFor='footer-newsletter-address'>{this.messages('email')}</label>
              <input
                type='text'
                className='footer-newsletter__form-input form-control form-control-lg'
                id='footer-newsletter-address'
                placeholder={this.messages('email')}
              />
              <button type='submit' className='footer-newsletter__form-button btn btn-lg btn-primary'>{this.messages('subscribe')}</button>
            </form>
          </div>
          <div className='col-xs-12 col-md-6'>
            <ul className='footer-social__social-links'>
              {this.socialLinksList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(FooterNewsletter)
