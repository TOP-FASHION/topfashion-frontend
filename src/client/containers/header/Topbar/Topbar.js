import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './Topbar.messages'
import DropdownLanguage from '../DropdownLanguage'
import { inject, observer } from 'mobx-react'
import './Topbar.scss'

@inject('modalStore', 'loginStore')
@observer
class Topbar extends Component {
  messages = setMessages(this, messages, 'app.topbar.')

  links = [
    { title: this.messages('promotions'), url: '/promotions-news' },
    { title: this.messages('contacts'), url: '/contact-us' }
  ];

  render () {
    const linksList = this.links.map((item, index) => (
      <div key={index} className='topbar__item topbar__item--link'>
        <Link className='link' to={item.url}>{item.title}</Link>
      </div>
    ))

    return (
      <div className='site-header__topbar topbar d-md-block d-lg-block d-xl-block d-none'>
        <div className='topbar__container container-fluid'>
          <div className='topbar__row'>
            {linksList}
            <div className='topbar__spring' />
            <div className='topbar__item'>
              Звонок бесплатный <a href='tel: 88002500557' className='topbar__call-phone'>8 800 250 05 57</a>
            </div>
            <div className='topbar__item'>
              <DropdownLanguage />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Topbar)
