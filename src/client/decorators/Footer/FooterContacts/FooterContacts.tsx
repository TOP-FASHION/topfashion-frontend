import React from 'react'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './FooterContacts.messages'
import './FooterContacts.scss'

const FooterContacts = (props: any) => {
  const message = setMessages(props, messages, 'app.footer.contacts.')

  return (
    <div className='site-footer__widget footer-contacts'>
      <h5 className='footer-contacts__title'>{message('title')}</h5>
      <ul className='footer-contacts__contacts'>
        <li>
          <i className='footer-contacts__icon fas fa-globe-americas' />
          {message('address')}
        </li>
        <li>
          <i className='footer-contacts__icon far fa-envelope' />
          {message('email')}
        </li>
        <li>
          <i className='footer-contacts__icon fas fa-mobile-alt' />
          {message('phone')}
        </li>
        <li>
          <i className='footer-contacts__icon far fa-clock' />
          {message('time')}
        </li>
      </ul>
    </div>
  )
}

export default injectIntl(FooterContacts)
