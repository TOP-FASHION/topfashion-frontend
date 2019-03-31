import React, { Component } from 'react';
import Link from '../Link'

import './Nav.scss';

class Nav extends Component {

  render() {
    return (
      <nav id="nav" className="nav" role="navigation" aria-label="site" tabIndex="-1">
        <button className="nav__togglebtn" id="menu-toggle" aria-expanded="false" aria-controls="menu">
          <span className="sr-only">Меню</span>
          <span className="menuicon">
            <span className="menuicon__bar"></span>
            <span className="menuicon__bar"></span>
            <span className="menuicon__bar"></span>
            <span className="menuicon__bar"></span>
         </span>
        </button>
        <div className="nav__content">
          <ul className="nav__list" id="menu">
            <li className="nav__item">
              <Link to='/catalog' className='nav__link'>
                <span className="nav__item__num" aria-hidden="true">0</span>Каталог
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/about' className='nav__link'>
                <span className="nav__item__num" aria-hidden="true">0</span>О нас
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/contact-us' className='nav__link'>
                <span className="nav__item__num" aria-hidden="true">0</span>Контакты
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav
