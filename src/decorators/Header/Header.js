import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Fragment from '../../components/Fragment'
import Nav from '../../components/Nav'
import Link from '../../components/Link'
import './Header.scss';

class Header extends Component {
  static propTypes = {
    scrollTop: PropTypes.number
  }
  static defaultProps = {
    scrollTop: 0
  }

  mainRender = () => {
    return (
      <header className="header" role="banner">
        <div className="header__inner container">
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
