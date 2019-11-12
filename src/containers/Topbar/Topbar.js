import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {injectIntl} from "react-intl"
import setMessages from "../../utils/setMessages"
import messages from "./Topbar.messages"
import Dropdown from '../../components/Dropdown'
import Fragment from '../../components/Fragment'
import DropdownLanguage from '../DropdownLanguage'
import {inject, observer} from "mobx-react"
import './Topbar.scss'

@inject('modalStore', 'loginStore')
@observer
class Topbar extends Component {
  messages = setMessages(this, messages, 'app.topbar.')
  links = [
    { title: this.messages('aboutUs'), url: '/about' },
    { title: this.messages('contacts'), url: '/contact-us' },
    { title: this.messages('storeLocation'), url: '' },
    { title: this.messages('trackOrder'), url: '/track-order' },
    { title: this.messages('blog'), url: '/blog/category-classic' },
  ];

  accountLinks = [
    { title: 'Dashboard', url: '/account/dashboard' },
    { title: 'Edit Profile', url: '/account/profile' },
    { title: 'Order History', url: '/account/orders' },
    { title: 'Addresses', url: '/account/addresses' },
    { title: 'Password', url: '/account/password' },
    { title: 'Logout', url: '/logout' },
  ];

  submit = () => {
    this.props.modalStore.openLogin()
  }

  render() {
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
            <Fragment hidden={this.props.loginStore.loggedIn}>
              <div className="topbar__item topbar__item--link">
                <Link className="topbar-link" to='' onClick={this.submit}>{this.messages('login')}</Link>
              </div>
            </Fragment>
            <Fragment hidden={!this.props.loginStore.loggedIn}>
              <div className="topbar__item">
                <Dropdown
                  title={this.messages('myAccount')}
                  items={this.accountLinks}
                />
              </div>
            </Fragment>
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
