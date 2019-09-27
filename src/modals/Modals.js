import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import LoginModal from './LoginModal'

@inject('loginStore')
@observer
class Modals extends Component {
  constructor () {
    super()
  }

  render () {
    const { isLoggedIn } = this.props.loginStore

    console.log('Modal isLoggedIn====', isLoggedIn)
    return isLoggedIn ? null : (
      <LoginModal />
    )
  }
}

export default Modals
