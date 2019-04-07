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
              <Link to='/' className='nav__link'>
                <span className="nav__item-num" aria-hidden="true">Главная</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/catalog' className='nav__link'>
                <span className="nav__item-num" aria-hidden="true">Каталог</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/technology' className='nav__link'>
                <span className="nav__item-num" aria-hidden="true">Технология</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/promotions' className='nav__link'>
                <span className="nav__item-num" aria-hidden="true">Акции</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/about' className='nav__link'>
                <span className="nav__item-num" aria-hidden="true">О нас</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to='/contact-us' className='nav__link'>
                <span className="nav__item-num" aria-hidden="true">Контакты</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav
