import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ProductsCarousel from '../ProductsCarousel'
import { injectIntl } from 'react-intl'
import './ProductsCarouselTabbs.scss'

@inject('productsStore')
@observer
class ProductsCarouselTabbs extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
    rows: PropTypes.number,
    withSidebar: PropTypes.bool,
    products: PropTypes.array
  };

  static defaultProps = {
    layout: 'grid-4',
    rows: 1,
    withSidebar: false
  };

  timeout;

  constructor (props) {
    super(props)

    this.state = {
      loading: false
      /*
      groups: [
        { id: 1, name: 'All', current: true },
        { id: 2, name: 'Power Tools', current: false },
        { id: 3, name: 'Hand Tools', current: false },
        { id: 4, name: 'Plumbing', current: false }
      ]
      */
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  handleChangeGroup = (newCurrentGroup) => {
    clearTimeout(this.timeout)

    const { groups } = this.state
    const currentGroup = groups.find((group) => group.current)

    if (currentGroup && currentGroup.id === newCurrentGroup.id) {
      return
    }

    this.setState((state) => (
      {
        loading: true,
        groups: state.groups.map((group) => (
          { ...group, current: group.id === newCurrentGroup.id }
        ))
      }
    ))

    // sending request to server, timeout is used as a stub
    this.timeout = setTimeout(() => {
      this.setState((state) => {
        // this is only for demo purpose
        const itemsArray = state.products
        const newItemsArray = []
        while (itemsArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * itemsArray.length)
          const randomItem = itemsArray.splice(randomIndex, 1)[0]
          newItemsArray.push(randomItem)
        }

        return {
          products: newItemsArray,
          loading: false
        }
      })
    }, 2000)
  };

  render () {
    return this.props.products ? (
      <ProductsCarousel
        {...this.props}
        {...this.state}
        products={this.props.products}
        onGroupClick={this.handleChangeGroup}
      />
    ) : null
  }
}

export default injectIntl(ProductsCarouselTabbs)
