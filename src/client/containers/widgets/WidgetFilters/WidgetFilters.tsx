import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Collapse from '../../../components/Collapse'
import FilterCategories from '../../productList/FilterCategories'
import FilterCheckbox from '../../productList/FilterCheckbox'
import FilterColor from '../../productList/FilterColor'
import FilterPrice from '../../productList/FilterPrice'
import './WidgetFilters.scss'

function WidgetFilters (props: any) {
  const { title, filters, offcanvas } = props

  const filtersList = filters.map((filter: any) => {
    let filterView: any

    if (filter.type === 'categories') {
      filterView = <FilterCategories />
    } else if (filter.type === 'checkbox') {
      filterView = <FilterCheckbox />
    } else if (filter.type === 'color') {
      filterView = <FilterColor />
    } else if (filter.type === 'price') {
      filterView = (
        <FilterPrice
          from={filter.options.from}
          to={filter.options.to}
          min={filter.options.min}
          max={filter.options.max}
          step={1}
        />
      )
    }

    return (
      <div key={filter.id} className='widget-filters__item'>
        <Collapse
          toggleClass='filter--opened'
          render={({ toggle, setItemRef, setContentRef }: any) => (
            <div className='filter filter--opened' ref={setItemRef}>
              <button type='button' className='filter__title' onClick={toggle}>
                {filter.name}
              </button>
              <div className='filter__body' ref={setContentRef}>
                <div className='filter__container'>
                  {filterView}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    )
  })

  const classes = classNames('widget-filters widget', {
    'widget-filters--offcanvas--always': offcanvas === 'always',
    'widget-filters--offcanvas--mobile': offcanvas === 'mobile'
  })

  return (
    <div className={classes}>
      <h4 className='widget-filters__title widget__title'>{title}</h4>

      <div className='widget-filters__list'>
        {filtersList}
      </div>
    </div>
  )
}

WidgetFilters.propTypes = {
  title: PropTypes.node,
  filters: PropTypes.array,
  offcanvas: PropTypes.oneOf(['always', 'mobile'])
}

WidgetFilters.defaultProps = {
  filters: [],
  offcanvas: 'mobile'
}

export default WidgetFilters
