import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react';

import Slider from '../../components/Slider'
import Posts from '../../components/Post'

import './Home.scss'
import Shelf from "../../containers/Shelf/Shelf"

@inject('products')
@observer
class Home extends Component {


  render() {
    const {
      products: { products }
    } = this.props.products;

    return (
      <React.Fragment>
        <Slider />
        <Shelf />
      </React.Fragment>
    );
  }
}

export default Home
