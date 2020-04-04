import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fragment from '../../components/Fragment'
import Static from '../../containers/shared/Static'

class StaticPage extends Component {
  static propTypes = {
    page: PropTypes.string
  }

  render () {
    const { page } = this.props
    return (
      <Fragment>
        <div id='static-page__anchor' />
        <div className='static-page__container container'>
          <div className='static-page__menu' xs={12} md={3}>
            <div className='static-page-menu'>
              {/* <AsideMenuItems id='menuAsideStatic' scrollTo='#static-page__anchor' className='static-page-menu__item' /> */}
            </div>
          </div>
          <div className='static-page__content'>
            <Static page={page} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default StaticPage
