import React from 'react'
import classNames from 'classnames'
import AppLink from '../../components/AppLink/index'
import MegaMenu from '../MegaMenu/index'
import Menu from '../Menu/index'
import './NavLinks.scss'

// data stubs
import navLinks from '../../data/headerNavigation';


function NavLinks() {
  const handleMouseEnter = (event) => {
    const item = event.currentTarget;
    const megamenu = item.querySelector('.nav-links__megamenu');

    if (megamenu) {
      const container = megamenu.offsetParent;
      const containerWidth = container.getBoundingClientRect().width;
      const megamenuWidth = megamenu.getBoundingClientRect().width;
      const itemOffsetLeft = item.offsetLeft;
      const megamenuPosition = Math.round(
        Math.min(itemOffsetLeft, containerWidth - megamenuWidth),
      );

      megamenu.style.left = `${megamenuPosition}px`;
    }
  };

  const linksList = navLinks.map((item, index) => {
    let arrow;
    let submenu;

    if (item.submenu) {
      arrow = <i className="fa fa-angle-down ml-2 opacity-5 nav-links__arrow"></i>;
    }

    if (item.submenu && item.submenu.type === 'menu') {
      submenu = (
        <div className="nav-links__menu">
          <Menu items={item.submenu.menu} />
        </div>
      );
    }

    if (item.submenu && item.submenu.type === 'megamenu') {
      submenu = (
        <div className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}>
          <MegaMenu menu={item.submenu.menu} />
        </div>
      );
    }

    const classes = classNames('nav-links__item', {
      'nav-links__item--with-submenu': item.submenu,
    });

    return (
      <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
        <AppLink to={item.url} {...item.props}>
          <span>
            {item.title}
            {arrow}
          </span>
        </AppLink>
        {submenu}
      </li>
    );
  });

  return (
    <ul className="nav-links__list">
      {linksList}
    </ul>
  );
}

export default NavLinks;
