import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchProducts } from '../../services/shelf/actions'

import Spinner from '../../components/Spinner'
import ProductList from '../../containers/ProductList'
import Slider from '../../components/Slider'

import './Home.scss'

class Home extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    filters: PropTypes.array,
    sort: PropTypes.string
  };

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.handleFetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, sort: nextSort } = nextProps;

    if (nextFilters !== this.props.filters) {
      this.handleFetchProducts(nextFilters, undefined);
    }

    if (nextSort !== this.props.sort) {
      this.handleFetchProducts(undefined, nextSort);
    }
  }

  handleFetchProducts = (
    filters = this.props.filters,
    sort = this.props.sort
  ) => {
    this.setState({ isLoading: true });
    this.props.fetchProducts(filters, sort, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { products } = this.props;
    const { isLoading } = this.state;
    console.log('products', products)
    return (
      <React.Fragment>+
        {isLoading && <Spinner />}
        <Slider />
        <div className="shelf-container">
          <ProductList products={products} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shelf.products
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Home);
