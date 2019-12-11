import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import HomeSlider from '../../containers/HomeSlider'
import BannerFeatures from '../../containers/BannerFeatures'
import ProductsCarouselTabbs from '../../containers/ProductsCarouselTabbs'
import HomeBanner from '../../containers/HomeBanner'
import Brands from '../../containers/Brands'
import PostsSlider from '../../containers/PostsSlider'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './Home.messages'
import posts from '../../data/blogPosts'
import normalizeCategory from '../../utils/normalizeCategory'
import './Home.scss'

@inject('productsStore')
@observer
class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      productsBestsellers: [],
      productsSale: []
    }
  }

  messages = setMessages(this, messages, 'app.page.home.')

  componentDidMount () {
    this.productsBestsellers()
    this.productsSale()
  }

  productsBestsellers = async () => {
    const products = await this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory('bestsellers')
    })
    this.setState(() => ({ productsBestsellers: products }))
  }

  productsSale = async () => {
    const products = await this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory('sale')
    })
    this.setState(() => ({ productsSale: products }))
  }

  render () {
    const { productsBestsellers, productsSale } = this.state

    return (
      <React.Fragment>
        <HomeSlider />
        <BannerFeatures layout='boxed' />
        {productsBestsellers ? <ProductsCarouselTabbs title={this.messages('bestsellers')} products={productsBestsellers} key='bestsellers' layout='grid-4' /> : null}
        <HomeBanner />
        {productsSale ? <ProductsCarouselTabbs title={this.messages('featured')} products={productsSale} key='sale' layout='grid-4' /> : null}
        <PostsSlider title='Latest News' layout='grid-nl' posts={posts} />
        <Brands />
      </React.Fragment>
    )
  }
}

export default injectIntl(Home)
