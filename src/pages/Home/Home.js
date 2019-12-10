import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import HomeSlider from '../../containers/HomeSlider'
import BannerFeatures from '../../containers/BannerFeatures'
import ProductsCarouselTabbs from '../../containers/ProductsCarouselTabbs'
import HomeBanner from '../../containers/HomeBanner'
import Brands from '../../containers/Brands'
import PostsSlider from '../../containers/PostsSlider'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './Home.messages'
import './Home.scss'
import posts from '../../data/blogPosts'

@observer
class Home extends Component {
  messages = setMessages(this, messages, 'app.page.home.')

  render () {
    return (
      <React.Fragment>
        <HomeSlider />
        <BannerFeatures layout='boxed' />
        <ProductsCarouselTabbs title={this.messages('bestsellers')} layout='grid-4' />
        <HomeBanner />
        <ProductsCarouselTabbs title={this.messages('featured')} layout='grid-4' />
        <PostsSlider title='Latest News' layout='grid-nl' posts={posts} />
        <Brands />
      </React.Fragment>
    )
  }
}

export default injectIntl(Home)
