import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './FooterSocial.messages'
import './FooterSocial.scss'

class FooterSocial extends Component {
  messages = setMessages(this, messages, 'app.footer.social.')

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
      <div className='site-footer__widget footer-social'>
        <h5 className='footer-social__title'>{this.messages('title')}</h5>

        <div className='footer-contacts__text'>
          {this.messages('text')}
        </div>
        <div className='footer-social__text footer-social__text--social'>
          {this.messages('social')}
        </div>

        <ul className='footer-social__social-links'>
          {this.socialLinksList}
        </ul>
      </div>
    )
  }
}

export default injectIntl(FooterSocial)
