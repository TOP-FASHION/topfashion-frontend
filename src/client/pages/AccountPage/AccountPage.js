import React from 'react'
import classNames from 'classnames'
import { Link, matchPath, Redirect, Switch, Route } from 'react-router-dom'
import PageHeader from '../../containers/shared/PageHeader'
import AccountDashboard from '../../containers/account/AccountDashboard'
import AccountPassword from '../../containers/account/AccountPassword'
import './AccountPage.scss'

export default function AccountPage (props) {
  const { match, location } = props

  const breadcrumb = [
    { title: 'Home', url: '/' },
    { title: 'My Account', url: '/account/dashboard' }
  ]

  const links = [
    { title: 'Dashboard', url: 'dashboard' },
    { title: 'Password', url: 'password' }
  ].map((link) => {
    const url = `${match.url}/${link.url}`
    const isActive = matchPath(location.pathname, { path: url })
    const classes = classNames('account-nav__item', {
      'account-nav__item--active': isActive
    })

    return (
      <li key={link.url} className={classes}>
        <Link to={url}>{link.title}</Link>
      </li>
    )
  })

  return (
    <React.Fragment>
      <PageHeader header='My Account' breadcrumb={breadcrumb} />

      <div className='block'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-3 d-flex'>
              <div className='account-nav flex-grow-1'>
                <h4 className='account-nav__title'>Navigation</h4>
                <ul>{links}</ul>
              </div>
            </div>
            <div className='col-12 col-lg-9 mt-4 mt-lg-0'>
              <Switch>
                <Redirect exact from={match.path} to={`${match.path}/dashboard`} />
                <Route exact path={`${match.path}/dashboard`} component={AccountDashboard} />
                <Route exact path={`${match.path}/password`} component={AccountPassword} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
