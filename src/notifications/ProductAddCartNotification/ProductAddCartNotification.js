import React from 'react'
import { injectIntl } from 'react-intl'
import {inject, observer} from "mobx-react"
import {toast} from 'react-toastify'
import Fragment from "../../components/Fragment"

@inject('productCartAddStore')
@observer
class ProductAddCartNotification extends React.Component {

  notify = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => this.props.productCartAddStore.clear()
    });
  };

  render () {
    return this.props.productCartAddStore.isProductAddCart && this.props.productCartAddStore.productId ? (
      <Fragment>
        {this.notify("Added")}
      </Fragment>
    ) : null
  }
}

export default injectIntl(ProductAddCartNotification)
