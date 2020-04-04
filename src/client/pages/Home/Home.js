import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Helmet } from 'react-helmet'
import HomeSlider from '../../containers/shared/HomeSlider'
import BannerFeatures from '../../containers/shared/BannerFeatures'
import ProductsCarouselTabbs from '../../containers/shared/ProductsCarouselTabbs'
import HomeBanner from '../../containers/shared/HomeBanner'
import HomeBannerSlider from '../../containers/shared/HomeBannerSlider'
import PostsSlider from '../../containers/shared/PostsSlider'
import AboutCompany from '../../components/AboutCompany'
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
      productsBestsellers: []
    }
  }

  static propTypes = {
    productsStore: PropTypes.object.isRequired,
    postStore: PropTypes.object.isRequired
  }

  messages = setMessages(this, messages, 'app.page.home.')

  componentDidMount () {
    this.productsBestsellers()
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

  render () {
    const { productsBestsellers } = this.state

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Top Fashion`}</title>
        </Helmet>
        <HomeSlider />
        <HomeBannerSlider />
        <HomeBanner />
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
        <BannerFeatures layout='boxed' />
        {this.props.postStore.posts
          ? <PostsSlider
            title='Latest News'
            layout='grid-nl'
            posts={this.props.postStore.posts}
          /> : null}
        <AboutCompany />
      </React.Fragment>
    )
  }
}

export default injectIntl(Home)
