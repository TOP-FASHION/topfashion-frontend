import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import Product from '../../containers/Product'
import { injectIntl } from 'react-intl'
import messages from './ProductModal.messages'
import setMessages from '../../utils/setMessages'
import { inject, observer } from 'mobx-react'
import './ProductModal.scss'

@inject('modalStore', 'productsStore', 'currencyStore')
@observer
class ProductModal extends Component {
  messages = setMessages(this, messages, 'modals.login.')

  close = () => {
    this.props.modalStore.closeProduct()
  }

  get products () {
    return this.props.productsStore.products
  }

  get product () {
    return this.products
      ? this.products.find(x => x.id === this.props.modalStore.productIdModal)
      : []
  }

  render () {
    const { openModalProduct } = this.props.modalStore
    console.log('openModalProduct', openModalProduct)

    return (
      <Modal
        centered
        size='xl'
        className='login-modal'
        show={openModalProduct}
        onHide={this.close}
      >
        <Modal.Body>
          <div className='quickview'>
            <button
              className='quickview__close'
              type='button'
              onClick={this.close}
            >
              <i className='fas fa-times' />
            </button>
            <Product product={this.product} layout='quickview' />
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default injectIntl(ProductModal)
