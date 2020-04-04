import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { reaction } from 'mobx'
// import addresses from '../../data/accountAddresses'
// import allOrders from '../../data/accountOrders'
import './AccountPageDashboard.scss'

@inject('userInfoStore')
@observer
class AccountPageDashboard extends Component {
  static propTypes = {
    userInfoStore: PropTypes.any.isRequired
  }

  componentDidMount () {
    reaction(
      () => this.props.userInfoStore.user,
      data => {
        if (data) {
          this.props.userInfoStore.getCustomerInfo()
        }
      },
      { fireImmediately: true }
    )
  }

  get user () {
    return this.props.userInfoStore.user
  }

  get customer () {
    return this.props.userInfoStore.customer
  }

  render () {
    /* const address = addresses[0];
    const orders = allOrders.slice(0, 3).map((order) => (
      <tr key={order.id}>
        <td>
          <Link to="/">
            #
            {order.id}
          </Link>
        </td>
        <td>{order.date}</td>
        <td>{order.status}</td>
        <td>{order.total}</td>
      </tr>
    )); */

    return this.user && this.customer ? (
      <div className='dashboard'>
        <Helmet>
          <title>{`My Account`}</title>
        </Helmet>

        <div className='dashboard__profile card profile-card'>
          <div className='card-body profile-card__body'>
            <div className='profile-card__avatar'>
              <img src='/assets/img/avatar.png' alt='' />
            </div>
            <div className='profile-card__name'>{this.user.firstname} {this.user.lastname}</div>
            <div className='profile-card__email'>{this.user.email}</div>
            <div className='profile-card__edit'>
              <Link to='profile' className='btn btn-secondary btn-sm'>Edit Profile</Link>
            </div>
          </div>
        </div>
        <div className='dashboard__address card address-card address-card--featured'>
          <div className='address-card__badge'>Default Address</div>
          <div className='address-card__body'>
            <div className='address-card__name'>{`${this.customer.first_name} ${this.customer.last_name}`}</div>
            <div className='address-card__row'>
              {this.customer.shipping.country}
              <br />
              {this.customer.shipping.postcode}
              ,
              {this.customer.shipping.city}
              <br />
              {this.customer.shipping.address_1}
            </div>
            <div className='address-card__row'>
              <div className='address-card__row-title'>Phone Number</div>
              <div className='address-card__row-content'>{this.customer.phone}</div>
            </div>
            <div className='address-card__row'>
              <div className='address-card__row-title'>Email Address</div>
              <div className='address-card__row-content'>{this.customer.email}</div>
            </div>
            <div className='address-card__footer'>
              <Link to='/'>Edit Address</Link>
            </div>
          </div>
        </div>
        <div className='dashboard__orders card'>
          <div className='card-header'>
            <h5>Recent Orders</h5>
          </div>
          <div className='card-divider' />
          <div className='card-table'>
            <div className='table-responsive-sm'>
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {orders} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ) : null
  }
}

export default AccountPageDashboard
