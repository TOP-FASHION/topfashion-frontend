import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Collapse from '../../components/Collapse'
import FilterCategories from '../../components/FilterCategories'
import FilterCheckbox from '../../components/FilterCheckbox'
import FilterColor from '../../components/FilterColor'
import FilterPrice from '../../components/FilterPrice'
import './WidgetFilters.scss'

function WidgetFilters (props) {
  const { title, filters, offcanvas } = props

  const filtersList = filters.map((filter) => {
    let filterView

    if (filter.type === 'categories') {
      filterView = <FilterCategories />
    } else if (filter.type === 'checkbox') {
      filterView = <FilterCheckbox items={filter.options.items} />
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
          render={({ toggle, setItemRef, setContentRef }) => (
            <div className='filter filter--opened' ref={setItemRef}>
              <button type='button' className='filter__title' onClick={toggle}>
                {filter.name}
                <i className='fas fa-angle-down filter__arrow' />
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

      <div className='widget-filters__actions d-flex'>
        <button type='button' className='btn btn-primary btn-sm'>Filter</button>
        <button type='button' className='btn btn-secondary btn-sm ml-2'>Reset</button>
      </div>
    </div>
  )
}

WidgetFilters.propTypes = {
  /**
   * widget title
   */
  title: PropTypes.node,
  /**
   * array of filters
   */
  filters: PropTypes.array,
  /**
   * indicates when sidebar bar should be off canvas
   */
  offcanvas: PropTypes.oneOf(['always', 'mobile'])
}

WidgetFilters.defaultProps = {
  filters: [],
  offcanvas: 'mobile'
}

export default WidgetFilters
