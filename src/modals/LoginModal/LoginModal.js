import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-bootstrap'
import LoginForm from '../../containers/LoginForm'
import {injectIntl} from 'react-intl'
import messages from './LoginModal.messages'
import setMessages from '../../utils/setMessages'
import {inject, observer} from "mobx-react"

@inject('modalStore')
@observer
class LoginModal extends Component {
  messages = setMessages(this, messages, 'modals.login.')

  close = () => {
    this.props.modalStore.closeLogin()
  }

  render () {
    const { openModalLogin } = this.props.modalStore

    console.log('openModalLogin')
    return  (
      <Modal centered className='login-modal' show={openModalLogin} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.messages('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    )
  }
}

export default injectIntl(LoginModal)
