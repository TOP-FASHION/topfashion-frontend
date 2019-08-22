import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Group from '../../components/Group'

import Shelf from '../../containers/Shelf/Shelf'
// components
import Header from '../Header'
import Footer from '../Footer'

class ProductDecorator extends Component {
  render () {
    return (
      <Group id='product'>
        <Header />
        <Group className='product-decorator__content'>
          <Shelf />
        </Group>
        <Footer />
      </Group>
    )
  }
}

export default ProductDecorator
