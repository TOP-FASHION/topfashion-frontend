import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import HomeSlider from '../../containers/HomeSlider'
import BannerFeatures from '../../containers/BannerFeatures'
import ProductsBlock from '../../containers/ProductsBlock'
import ProductsCarouselTabbs from '../../containers/ProductsCarouselTabbs'
import HomeBanner from '../../containers/HomeBanner'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './Home.messages'
import './Home.scss'

@observer
class Home extends Component {
  messages = setMessages(this, messages, 'app.page.home.')

  render () {
    return (
      <React.Fragment>
        <HomeSlider />
        <BannerFeatures />
        <ProductsCarouselTabbs title={this.messages('featured')} layout='grid-4' />
        <HomeBanner />
        <ProductsBlock title={this.messages('bestsellers')} layout='large-first' />
      </React.Fragment>
    )
  }
}

export default injectIntl(Home)
