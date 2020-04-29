import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { AppContext } from '../../../core/Store/context';
import WidgetFilters from '../../widgets/WidgetFilters';
import WidgetProducts from '../../widgets/WidgetProducts';
import filters from '../../../settings/shopFilters';
import './CategorySidebar.scss';

interface Props {
  offcanvas?: 'always' | 'mobile';
}

const CategorySidebar = observer(({ offcanvas = 'mobile' }: Props) => {
  const { mobileMenuStore } = React.useContext(AppContext);

  const classes = classNames('block block-sidebar', {
    'block-sidebar--open': mobileMenuStore.isOpenMobileFilter,
    'block-sidebar--offcanvas--always': offcanvas === 'always',
    'block-sidebar--offcanvas--mobile': offcanvas === 'mobile',
  });

  return (
    <div className={classes}>
      {/* eslint-disable-next-line max-len */}
      <div className="block-sidebar__backdrop" />
      <div className="block-sidebar__body">
        <div className="block-sidebar__header">
          <div className="block-sidebar__title">Filters</div>
          <button
            className="block-sidebar__close"
            type="button"
            onClick={() => mobileMenuStore.closeMobileFilter()}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="block-sidebar__item">
          <WidgetFilters
            title="Filters"
            filters={filters}
            offcanvas={offcanvas}
          />
        </div>
        {offcanvas !== 'always' && (
          <div className="block-sidebar__item d-none d-lg-block">
            <WidgetProducts title="Latest Products" />
          </div>
        )}
      </div>
    </div>
  );
});

export default CategorySidebar;
