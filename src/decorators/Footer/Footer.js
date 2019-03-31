import React, { Component } from 'react'
// ui components
import Fragment from '../../components/Fragment'
// seed components

class Footer extends Component {
  render () {
    return (
      <Fragment>
        <div className='footer'>
          <div className='footer__container'>
            <div className='footer__bottom-section'>
              <div className='container'>
                <FooterMessages />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Footer

class FooterMessages extends Component {
  render () {
    return (
      <div className='footer__messages footer__messages--swe'>
      </div>
    )
  }
}
