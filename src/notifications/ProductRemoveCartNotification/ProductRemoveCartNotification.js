import React from 'react'
import { injectIntl } from 'react-intl'
import {toast} from 'react-toastify'
import {inject, observer} from "mobx-react"
import Fragment from "../../components/Fragment"

@inject('productCartRemoveStore')
@observer
class ProductRemoveCartNotification extends React.Component {

  notify = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => this.props.productCartRemoveStore.clear()
    });
  };

  render () {
    return this.props.productCartRemoveStore.isProductRemoveCart && this.props.productCartRemoveStore.cartItemKkey ? (
      <Fragment>
        {this.notify("Remove!")}
      </Fragment>
    ) : null
  }
}

export default injectIntl(ProductRemoveCartNotification)
