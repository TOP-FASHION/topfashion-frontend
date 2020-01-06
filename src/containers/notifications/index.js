import React from 'react'
import Fragment from '../../components/Fragment'
import { ToastContainer } from 'react-toastify'
import ProductAddCartNotification from './ProductAddCartNotification'
import ProductRemoveCartNotification from './ProductRemoveCartNotification'
import LoginNotification from './LoginNotification'

export default class Notifications extends React.Component {
  render () {
    return (
      <Fragment>
        <ToastContainer autoClose={5000} />
        <ProductAddCartNotification />
        <ProductRemoveCartNotification />
        <LoginNotification />
      </Fragment>
    )
  }
}
