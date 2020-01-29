import React from 'react'
import PropTypes from 'prop-types'
import Group from '../../components/Group'
import Fragment from '../../components/Fragment'
import { inject, observer } from 'mobx-react'

@inject('loginStore')
@observer
class Logout extends React.Component {
  static propTypes = {
    loginStore: PropTypes.any
  };

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

export default Logout
