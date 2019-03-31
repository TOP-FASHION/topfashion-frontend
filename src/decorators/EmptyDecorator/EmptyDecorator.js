import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Blocked from '../../pages/Blocked/index'

export default class EmptyDecorator extends Component {
  render () {
    return (
      <div className='empty-decorator'>
        <div className='empty-decorator__content'>
          <Route path={'/blocked'} component={Blocked} exact />
        </div>
      </div>
    )
  }
}
