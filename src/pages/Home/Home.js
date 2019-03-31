import React, { Component } from 'react'

import Shelf from '../../containers/Shelf'
import Filter from '../../containers/Filter'
import FloatCart from '../../containers/FloatCart'

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <Filter />
          <Shelf />
        </main>
        <FloatCart />
      </React.Fragment>
    );
  }
}

export default Home

