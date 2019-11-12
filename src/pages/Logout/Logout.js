import React from 'react'
import Group from '../../components/Group'
import Fragment from '../../components/Fragment'
import { inject, observer } from 'mobx-react'

@inject('loginStore')
@observer
export default class Logout extends React.Component {
  render () {
    return (
      <div className='logout'>
        <Group className='content__wrapper'>
          <Fragment onInit={this.props.loginStore.logout()} />
        </Group>
      </div>
    )
  }
}
