import React from 'react';
import { injectIntl } from 'react-intl';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { AppContext } from '../../../core/Store/context';
import Fragment from '../../../components/Fragment';

const ProductAddCartNotification = observer((props: any) => {
  const { cartAddProductStore } = React.useContext(AppContext);

  const notify = (text: any) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => cartAddProductStore.clear(),
    });
  };

  return cartAddProductStore.isProductAddCart &&
    cartAddProductStore.productId ? (
    <Fragment>{notify('Added')}</Fragment>
  ) : null;
});

export default injectIntl(ProductAddCartNotification);
