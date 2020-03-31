import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import Product from '../../shared/Product'
import { injectIntl } from 'react-intl'
import messages from './ProductModal.messages'
import setMessages from '../../../utils/setMessages'
import { inject, observer } from 'mobx-react'
import './ProductModal.scss'

@inject('modalStore', 'productsStore')
@observer
class ProductModal extends Component {
  static propTypes = {
    modalStore: PropTypes.any,
    productsStore: PropTypes.any
  };

  messages = setMessages(this, messages, 'modals.login.')

  close = () => {
    this.props.modalStore.closeProduct()
  }

  get products () {
    return this.props.productsStore.allProducts
  }

  get product () {
    return this.products ? this.products.find(x => x.id === this.props.modalStore.productIdModal) : []
  }

  render () {
    const { openModalProduct } = this.props.modalStore

    return (
      <Modal
        centered
        size='xl'
        className='product-modal'
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
            {this.product ? <Product product={this.product} layout='quickview' /> : null}
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default injectIntl(ProductModal)
