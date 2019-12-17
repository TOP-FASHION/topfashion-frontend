import React, { Component } from 'react'
import { observer } from 'mobx-react'
import LoginModal from './LoginModal'
import ProductModal from './ProductModal'
import Fragment from '../components/Fragment'
import './Modals.scss'

@observer
class Modals extends Component {
  render () {
    return (
      <Fragment>
        <LoginModal />
        <ProductModal />
      </Fragment>
    )
  }
}

export default Modals
