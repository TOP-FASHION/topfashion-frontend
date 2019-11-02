import React, {Component} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {inject, observer} from "mobx-react"
import './FilterColor.scss'

@inject('productAttributesStore', 'productsStore')
@observer
class FilterColor extends Component {

  componentDidMount () {
    this.props.productAttributesStore.getAttributeTerms(3)
  }

  get itemsList () {
    const { attributeTerms } = this.props.productAttributesStore;

    return attributeTerms ? attributeTerms.map((item) => (
      <div key={item} className="filter-color__item">
      <span
        className={classNames('filter-color__check input-check-color', {
          'input-check-color--white': item,
          'input-check-color--light': item,
        })}
        style={{ color: item }}
      >
        <label className="input-check-color__body">
          <input className="input-check-color__input" type="checkbox" defaultChecked={item.checked} disabled={item.disabled} />
          <span className="input-check-color__box" />
          <i className="input-check-color__icon fas fa-check"></i>
          <span className="input-check-color__stick" />
        </label>
      </span>
      </div>
    )) : null
  }

  render () {
    return (
      <div className="filter-color">
        <div className="filter-color__list">
          {this.itemsList}
        </div>
      </div>
    );
  }
}

FilterColor.propTypes = {
  items: PropTypes.array,
};

export default FilterColor;
