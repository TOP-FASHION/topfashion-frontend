import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { AppContext } from '../../../core/Store/context';
import Product from '../../product/Product';
// import messages from './ProductModal.messages'
// import setMessages from '../../../utils/setMessages'
import './ProductModal.scss';

const ProductModal = observer((props: any) => {
  const { modalStore, productsStore } = React.useContext(AppContext);
  // const message = setMessages(props, messages, 'modals.login.')
  const { allProducts } = productsStore;
  const { openModalProduct } = modalStore;

  const close = () => {
    modalStore.closeProduct();
  };

  const product = allProducts
    ? allProducts.find((x) => x.id === modalStore.productIdModal)
    : [];

  return (
    <Modal
      centered
      size="xl"
      className="product-modal"
      show={openModalProduct}
      onHide={close}
    >
      <Modal.Body>
        <div className="quickview">
          <button className="quickview__close" type="button" onClick={close}>
            <i className="fas fa-times" />
          </button>
          {product ? <Product product={product} layout="quickview" /> : null}
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default injectIntl(ProductModal);
