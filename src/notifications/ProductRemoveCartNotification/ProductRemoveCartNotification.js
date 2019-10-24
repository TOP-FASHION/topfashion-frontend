import React from 'react'
import { injectIntl } from 'react-intl'
import {toast} from 'react-toastify'
import {inject, observer} from "mobx-react"
import Fragment from "../../components/Fragment"

@inject('cartRemoveProductStore')
@observer
class ProductRemoveCartNotification extends React.Component {

  notify = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => this.props.cartRemoveProductStore.clear()
    });
  };

  render () {
    return this.props.cartRemoveProductStore.isProductRemoveCart && this.props.cartRemoveProductStore.cartItemKkey ? (
      <Fragment>
        {this.notify("Remove!")}
      </Fragment>
    ) : null
  }
}

export default injectIntl(ProductRemoveCartNotification)
