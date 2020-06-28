import React from 'react';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';
import { AppContext } from '../../../store/context';
import Fragment from '../../../components/Fragment';

const ProductRemoveCartNotification = observer(() => {
  const { cartRemoveProductStore } = React.useContext(AppContext);

  const notify = (text: any) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => cartRemoveProductStore.clear(),
    });
  };

  return cartRemoveProductStore.isProductRemoveCart &&
    cartRemoveProductStore.cartItemKkey ? (
    <Fragment>{notify('Remove!')}</Fragment>
  ) : null;
});

export default injectIntl(ProductRemoveCartNotification);
