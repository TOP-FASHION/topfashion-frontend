import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {injectIntl} from "react-intl"
import setMessages from "../../utils/setMessages"
import messages from "./Topbar.messages"
import './Topbar.scss'
import Dropdown from '../Dropdown'
import DropdownCurrency from '../DropdownCurrency'
import DropdownLanguage from '../DropdownLanguage'
import {inject, observer} from "mobx-react"

@inject('modalStore')
@observer
class Topbar extends Component {
  messages = setMessages(this, messages, 'app.topbar.')
  values = {
    currency: 'EUR'
  };
  links = [
    { title: this.messages('aboutUs'), url: '/about' },
    { title: this.messages('contacts'), url: '/site/contact-us' },
    { title: this.messages('storeLocation'), url: '' },
    { title: this.messages('trackOrder'), url: '/shop/track-order' },
    { title: this.messages('blog'), url: '/blog/category-classic' },
  ];

  accountLinks = [
    { title: 'Dashboard', url: '/account/dashboard' },
    { title: 'Edit Profile', url: '/account/profile' },
    { title: 'Order History', url: '/account/orders' },
    { title: 'Addresses', url: '/account/addresses' },
    { title: 'Password', url: '/account/password' },
    { title: 'Logout', url: '/account/login' },
  ];

  currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  submit = () => {
    this.props.modalStore.openLogin()
  }

  render() {
    const { openLogin } = this.props.modalStore

    const linksList = this.links.map((item, index) => (
      <div key={index} className="topbar__item topbar__item--link">
        <Link className="topbar-link" to={item.url}>{item.title}</Link>
      </div>
    ));

    return (
      <div className="site-header__topbar topbar">
        <div className="topbar__container container">
          <div className="topbar__row">
            {linksList}
            <div className="topbar__spring" />
            <div className="topbar__item topbar__item--link">
              <Link className="topbar-link" to='' onClick={this.submit}>{this.messages('login')}</Link>
            </div>
            <div className="topbar__item">
              <Dropdown
                title={this.messages('myAccount')}
                items={this.accountLinks}
              />
            </div>
            <div className="topbar__item">
              <DropdownCurrency />
            </div>
            <div className="topbar__item">
              <DropdownLanguage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Topbar)
