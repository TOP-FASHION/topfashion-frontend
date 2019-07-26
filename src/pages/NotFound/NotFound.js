import React, { Component } from 'react'
import Status from '../../components/RouterStatus/Status'
import Group from '../../components/Group'
import './NotFound.scss'

class NotFound extends Component {
  render () {
    return (
      <Status code={404}>
        <Group className='not-found-page'>
          <div className='not-found-page__content'>Нет страницы</div>
        </Group>
      </Status>
    )
  }
}

export default NotFound
