import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from '../Footer.messages.js'
import './FooterNewsletter.scss'

class FooterNewsletter extends Component {
  messages = setMessages(this, messages, 'app.footer.')

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
    },
    {
      key: 'rss',
      url: '/',
      iconClass: 'fas fa-rss'
    }
  ];

  get socialLinksList () {
    return this.socialLinks.map((item) => (
      <li key={item.key} className={`footer-newsletter__social-link footer-newsletter__social-link--${item.key}`}>
        <a href={item.url} target='_blank' rel='noopener noreferrer'>
          <i className={item.iconClass} />
        </a>
      </li>
    ))
  }

  render () {
    return (
      <div className='site-footer__widget footer-newsletter'>
        <h5 className='footer-newsletter__title'>Newsletter</h5>
        <div className='footer-newsletter__text'>
          {this.messages('newsletter.text')}
        </div>

        <form action='' className='footer-newsletter__form'>
          <label className='sr-only' htmlFor='footer-newsletter-address'>{this.messages('newsletter.email')}</label>
          <input
            type='text'
            className='footer-newsletter__form-input form-control'
            id='footer-newsletter-address'
            placeholder='Email Address...'
          />
          <button type='submit' className='footer-newsletter__form-button btn btn-primary'>{this.messages('newsletter.subscribe')}</button>
        </form>

        <div className='footer-newsletter__text footer-newsletter__text--social'>
          {this.messages('newsletter.social')}
        </div>

        <ul className='footer-newsletter__social-links'>
          {this.socialLinksList}
        </ul>
      </div>
    )
  }
}

export default injectIntl(FooterNewsletter)
