import React from 'react'
import { injectIntl } from 'react-intl'
import { inject, observer } from 'mobx-react'
import { toast } from 'react-toastify'
import Fragment from '../../components/Fragment'

@inject('cartAddProductStore')
@observer
class ProductAddCartNotification extends React.Component {
  notify = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => this.props.cartAddProductStore.clear()
    })
  };

  render () {
    return this.props.cartAddProductStore.isProductAddCart && this.props.cartAddProductStore.productId ? (
      <Fragment>
        {this.notify('Added')}
      </Fragment>
    ) : null
  }
}

export default injectIntl(ProductAddCartNotification)
