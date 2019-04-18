import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react';

import Slider from '../../components/Slider'
import Posts from '../../components/Post'

import './Home.scss'

@inject('Products')
@observer
class Home extends Component {
  render() {
    const { Products } = this.props
    console.log('Products', Products.pullUser())

    return (
      <React.Fragment>
        <Slider />
      </React.Fragment>
    );
  }
}

export default Home
