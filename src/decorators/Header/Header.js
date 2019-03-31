import React, {Component} from 'react'
import PropTypes from 'prop-types'

// ui components
import Fragment from '../../components/Fragment'
import Group from '../../components/Group'
import Nav from '../../components/Nav'
import './Header.scss';

class Header extends Component {
  static propTypes = {
    scrollTop: PropTypes.number
  }
  static defaultProps = {
    scrollTop: 0
  }

  get top() {
    return document.documentElement.scrollTop || document.body.scrollTop
  }

  mainRender = () => {
    return (
      <header className="header" role="banner">
        <div className="header__inner container">
          <a className="brand" href="/" rel="home" aria-label="Go To Homepage">
            Лого
          </a>
          <Nav/>
          <div className="menu-animation">
            <div id="animation-circle" className="menu-animation__circle"></div>
          </div>
        </div>
      </header>
    )
  }

  render() {
    return <Fragment>{this.mainRender}</Fragment>
  }
}

export default Header
