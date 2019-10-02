import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import HomeSlider from "../../containers/HomeSlider"
import BannerFeatures from '../../containers/BannerFeatures'
import ProductsBlock from '../../containers/ProductsBlock'
import ProductsCarouselTabbs from '../../containers/ProductsCarouselTabbs'
import HomeBanner from '../../containers/HomeBanner'
import './Home.scss'

@observer
class Home extends Component {
  render () {
    return (
      <React.Fragment>
        <HomeSlider withDepartments />
        <BannerFeatures />
        {/*<ProductsCarouselTabbs title="Featured Products" layout="grid-4" />*/}
        <HomeBanner />
        <ProductsBlock
          title="Bestsellers"
          layout="large-first"
        />

      </React.Fragment>
    )
  }
}

export default Home
