import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Menu.scss';

interface Props {
  layout?: 'classic' | 'topbar';
  withIcons?: boolean;
  items?: Array<[]>;
  onClick?: Function;
}

const Menu = ({
  layout = 'classic',
  withIcons = false,
  items = [],
  onClick = () => {},
}: Props) => {
  const renderLink = (item: any, content: any) => {
    let link;

    if (item.post_name) {
      link = (
        <Link {...item.props} to={`/${item.url}`} onClick={() => onClick(item)}>
          {content}
        </Link>
      );
    } else if (item.url) {
      link = (
        <Link {...item.props} to={item.url} onClick={() => onClick(item)}>
          {content}
        </Link>
      );
    } else {
      link = (
        <button type="button" onClick={() => onClick(item)}>
          {content}
        </button>
      );
    }

    return link;
  };

  const itemsList = items.map((item: any, index) => {
    let arrow;
    let submenu;
    let icon;

    if (item.submenu) {
      submenu = (
        <div className="menu__submenu">
          <Menu items={item.submenu} />
        </div>
      );
    }

    if (item.submenu) {
      arrow = (
        <i className="fa fa-angle-right ml-2 opacity-5 departments__link-arrow" />
      );
    }

    if (withIcons && item.icon) {
      icon = (
        <div className="menu__icon">
          <img src={item.icon} srcSet={item.icon_srcset} alt="" />
        </div>
      );
    }

    return (
      <li key={index}>
        {renderLink(
          item,
          <>
            {icon}
            {item.label}
            {arrow}
          </>
        )}
        {submenu}
      </li>
    );
  });

  const classes = classNames(`menu menu--layout--${layout}`, {
    'menu--with-icons': withIcons,
  });

  return <ul className={classes}>{itemsList}</ul>;
};

export default Menu;
