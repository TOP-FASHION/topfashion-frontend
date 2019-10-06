import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import LoginModal from './LoginModal'
import ProductModal from './ProductModal'
import Fragment from '../components/Fragment'
import './Modals.scss'

@inject('loginStore')
@observer
class Modals extends Component {
  constructor () {
    super()
  }

  render () {
    const { isLoggedIn } = this.props.loginStore

    return (
      <Fragment>
        <LoginModal />
        <ProductModal />
      </Fragment>
    )
  }
}

export default Modals
