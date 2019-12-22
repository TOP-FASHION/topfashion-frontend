import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
// import { Helmet } from 'react-helmet';
import PageHeader from '../../containers/PageHeader'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import ProductsView from '../../containers/ProductsView/ProductsView'

@inject('productSearchStore')
@observer
class SearchPage extends Component {
  static propTypes = {
    productSearchStore: PropTypes.any,
    columns: PropTypes.number,
    viewMode: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    match: PropTypes.shape({
      params: PropTypes.shape({
        productId: PropTypes.string
      })
    })
  }

  static defaultProps = {
    columns: 5,
    viewMode: 'grid'
  };

  get breadcrumb () {
    return [
      { title: 'Home', url: '' },
      { title: 'Search', url: '' }
    ]
  }

  get content () {
    return (
      <React.Fragment>
        <div className='container'>
          <div className='block'>
            <ProductsView
              products={this.props.productSearchStore.productBySearch}
              layout={this.props.viewMode}
              grid={`grid-${this.props.columns}-full`}
              limit={15}
              offcanvas='mobile'
            />
          </div>
        </div>
      </React.Fragment>
    )
  }

  render () {
    return this.props.productSearchStore.productBySearch ? (
      <React.Fragment>
        <PageHeader breadcrumb={this.breadcrumb} />
        {this.content}
      </React.Fragment>
    ) : <Redirect to='/' />
  }
}

export default SearchPage
