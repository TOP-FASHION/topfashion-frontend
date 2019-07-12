import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import './Home.scss'
import Shelf from '../../containers/Shelf/Shelf'

@observer
class Home extends Component {

  render () {
    return (
      <React.Fragment>
        55
        <Shelf />
      </React.Fragment>
    )
  }
}

export default Home
