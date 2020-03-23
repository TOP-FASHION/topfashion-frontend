import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Helmet } from 'react-helmet'
import HomeSlider from '../../containers/shared/HomeSlider'
import BannerFeatures from '../../containers/shared/BannerFeatures'
import ProductsCarouselTabbs from '../../containers/shared/ProductsCarouselTabbs'
import HomeBanner from '../../containers/shared/HomeBanner'
import Brands from '../../containers/shared/Brands'
import PostsSlider from '../../containers/shared/PostsSlider'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './Home.messages'
import normalizeCategory from '../../utils/normalizeCategory'
import './Home.scss'

@inject('productsStore', 'postStore')
@observer
class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      productsBestsellers: [],
      productsSale: [],
      productsNew: []
    }
  }

  static propTypes = {
    productsStore: PropTypes.object.isRequired,
    postStore: PropTypes.object.isRequired
  }

  messages = setMessages(this, messages, 'app.page.home.')

  componentDidMount () {
    this.productsBestsellers()
    this.productsSale()
    this.productsNew()
    this.props.postStore.getPosts()
  }

  productsBestsellers = async () => {
    const productsBestsellers = await this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory('bestsellers')
    })
    this.setState(() => ({ productsBestsellers: productsBestsellers }))
  }

  productsSale = async () => {
    const productsSale = await this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory('sale')
    })
    this.setState(() => ({ productsSale: productsSale }))
  }

  productsNew = async () => {
    const productsNew = await this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory('new')
    })
    this.setState(() => ({ productsNew: productsNew }))
  }

  render () {
    const { productsBestsellers, productsSale, productsNew } = this.state

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Top Fashion`}</title>
        </Helmet>
        <HomeSlider />
        {productsBestsellers
          ? <ProductsCarouselTabbs
            title={this.messages('bestsellers')}
            products={productsBestsellers}
            group='bestsellers'
            allProducts
            key='bestsellers'
            layout='grid-5'
          /> : null
        }
        <HomeBanner />
        {productsSale
          ? <ProductsCarouselTabbs
            title={this.messages('sale')}
            products={productsSale}
            group='sale'
            allProducts
            key='sale'
            layout='grid-5'
          /> : null
        }
        <BannerFeatures layout='boxed' />
        {productsNew
          ? <ProductsCarouselTabbs
            title={this.messages('new')}
            products={productsNew}
            group='new'
            allProducts
            key='new'
            layout='grid-5'
          /> : null
        }
        {this.props.postStore.posts
          ? <PostsSlider
            title='Latest News'
            layout='grid-nl'
            posts={this.props.postStore.posts}
          /> : null}
        <Brands />
      </React.Fragment>
    )
  }
}

export default injectIntl(Home)
