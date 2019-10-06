import React, { Component } from 'react'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Indicator from '../Indicator'

@inject('productsCartStore')
@observer
class IndicatorCart extends Component {
  componentDidMount () {
    this.props.productsCartStore.getProductCart()
  }

  //   const { cart } = props;
  //   let dropdown;
  //   let totals;
  // console.log('props', props)
  //   if (cart && cart.extraLines.length > 0) {
  //     const extraLines = cart.extraLines.map((extraLine, index) => (
  //       <tr key={index}>
  //         <th>{extraLine.title}</th>
  //         <td>EUR</td>
  //       </tr>
  //     ));
  //
  //     totals = (
  //       <React.Fragment>
  //         <tr>
  //           <th>Subtotal</th>
  //           <td>EUR</td>
  //         </tr>
  //         {extraLines}
  //       </React.Fragment>
  //     );
  //   }
  //
  //   const items = cart.items.map((item) => {
  //     let options;
  //     let image;
  //
  //     if (item.options) {
  //       options = (
  //         <ul className="dropcart__product-options">
  //           {item.options.map((option, index) => (
  //             <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
  //           ))}
  //         </ul>
  //       );
  //     }
  //
  //     if (item.product.images.length) {
  //       image = (
  //         <div className="dropcart__product-image">
  //           <Link to={`/shop/product/${item.product.id}`}>
  //             <img src={item.product.images[0]} alt="" />
  //           </Link>
  //         </div>
  //       );
  //     }
  //
  //
  //
  //     return (
  //       <div key={item.id} className="dropcart__product">
  //         {image}
  //         <div className="dropcart__product-info">
  //           <div className="dropcart__product-name">
  //             <Link to={`/shop/product/${item.product.id}`}>{item.product.name}</Link>
  //           </div>
  //           {options}
  //           <div className="dropcart__product-meta">
  //             <span className="dropcart__product-quantity">{item.quantity}</span>
  //             {' x '}
  //             <span className="dropcart__product-price">RUR</span>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  //
  //   if (cart.quantity) {
  //     dropdown = (
  //       <div className="dropcart">
  //         <div className="dropcart__products-list">
  //           {items}
  //         </div>
  //
  //         <div className="dropcart__totals">
  //           <table>
  //             <tbody>
  //             {totals}
  //             <tr>
  //               <th>Total</th>
  //               <td>EUR</td>
  //             </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //
  //         <div className="dropcart__buttons">
  //           <Link className="btn btn-secondary" to="/shop/cart">View Cart</Link>
  //           <Link className="btn btn-primary" to="/shop/checkout">Checkout</Link>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     dropdown = (
  //       <div className="dropcart">
  //         <div className="dropcart__empty">
  //           Your shopping cart is empty!
  //         </div>
  //       </div>
  //     );
  //   }
  render () {
    return this.props.productsCartStore.productsCart ? (
      <Indicator
        url='/shop/cart'
        icon={
          <i className='fa fa-angle-up ml-2 opacity-5 departments__button-arrow' />
        }
      />
    ) : null
  }
}

export default IndicatorCart
