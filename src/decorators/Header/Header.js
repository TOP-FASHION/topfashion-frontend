import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {Container} from 'reactstrap'
import { Link } from 'react-router-dom'
import NavPanel from '../../components/NavPanel'
import Search from '../../components/Search'
import Topbar from '../../components/Topbar'
import setMessages from "../../utils/setMessages"
import messages from "./Header.messages"
import './Header.scss'

class Header extends Component {
  static propTypes = {
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact']),
  };

  static defaultProps = {
    layout: 'default',
  };

  messages = setMessages(this, messages, 'app.header.')

  render() {
    const { layout } = this.props;
    let bannerSection;
    if (layout === 'default') {
      bannerSection = (
        <Container className="site-header__middle">
          <div className="site-header__logo">
            <Link to="/"><img src="public/img/logos/shop-logo.svg" width="180px" /></Link>
          </div>
          <div className="site-header__search">
            <Search />
          </div>
          <div className="site-header__phone">
            <div className="site-header__phone-title">
              {this.messages('phoneLabel')}
            </div>
            <div className="site-header__phone-number">
              {this.messages('phone')}
            </div>
          </div>
        </Container>
      );
    }

    return (
      <div className="site-header">
        <Topbar />
        {bannerSection}
        <div className="site-header__nav-panel">
          <NavPanel layout={layout} />
        </div>
      </div>
    );
  }
}

export default injectIntl(Header)
