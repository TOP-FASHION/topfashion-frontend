import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import { AppContext } from '../../../core/Store/context'
// import addresses from '../../data/accountAddresses'
// import allOrders from '../../data/accountOrders'
import './AccountDashboard.scss'

const AccountDashboard = observer((props: any) => {
  const { userInfoStore } = React.useContext(AppContext)

  React.useEffect(() => {
    reaction(
      () => userInfoStore.user,
      data => {
        console.log('data')
        if (data) {
          userInfoStore.getCustomerInfo()
        }
      },
      { fireImmediately: true }
    )
  }, [])

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

  return userInfoStore.user && userInfoStore.customer ? (
    <div className='dashboard'>
      <Helmet>
        <title>{`My Account`}</title>
      </Helmet>

      <div className='dashboard__profile card profile-card'>
        <div className='card-body profile-card__body'>
          <div className='profile-card__avatar'>
            <img src='/assets/img/avatar.png' alt='' />
          </div>
          <div className='profile-card__name'>{userInfoStore.user.firstname} {userInfoStore.user.lastname}</div>
          <div className='profile-card__email'>{userInfoStore.user.email}</div>
          <div className='profile-card__edit'>
            <Link to='profile' className='btn btn-secondary btn-sm'>Edit Profile</Link>
          </div>
        </div>
      </div>
      <div className='dashboard__address card address-card address-card--featured'>
        <div className='address-card__badge'>Default Address</div>
        <div className='address-card__body'>
          <div className='address-card__name'>{`${userInfoStore.customer.first_name} ${userInfoStore.customer.last_name}`}</div>
          <div className='address-card__row'>
            {userInfoStore.customer.shipping.country}
            <br />
            {userInfoStore.customer.shipping.postcode}
            ,
            {userInfoStore.customer.shipping.city}
            <br />
            {userInfoStore.customer.shipping.address_1}
          </div>
          <div className='address-card__row'>
            <div className='address-card__row-title'>Phone Number</div>
            <div className='address-card__row-content'>{userInfoStore.customer.phone}</div>
          </div>
          <div className='address-card__row'>
            <div className='address-card__row-title'>Email Address</div>
            <div className='address-card__row-content'>{userInfoStore.customer.email}</div>
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
})

export default AccountDashboard
