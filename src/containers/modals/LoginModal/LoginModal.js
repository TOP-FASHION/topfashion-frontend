import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import LoginForm from '../../shared/LoginForm'
import RegistrationForm from '../../shared/RegistrationForm'
import Fragment from '../../../components/Fragment'
import { injectIntl } from 'react-intl'
import messages from './LoginModal.messages'
import setMessages from '../../../utils/setMessages'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import './LoginModal.scss'

@inject('modalStore')
@observer
class LoginModal extends Component {
  static propTypes = {
    modalStore: PropTypes.any
  };

  constructor (props) {
    super(props)

    this.state = {
      currentTab: 'login'
    }
  }

  messages = setMessages(this, messages, 'modals.login.')

  setTab = (newTab) => {
    this.setState(() => ({ currentTab: newTab }))
  };

  close = () => {
    this.props.modalStore.closeLogin()
  }

  render () {
    const { currentTab } = this.state
    const { openModalLogin } = this.props.modalStore

    const tabs = [
      { key: 'login', title: this.messages('title') },
      { key: 'registration', title: this.messages('signUp') }
    ]

    const tabsButtons = tabs.map((tab) => {
      const classes = classNames('modal-title__item', {
        'modal-title__item--active': currentTab === tab.key
      })

      return <span key={tab.key} onClick={() => this.setTab(tab.key)} className={classes}>{tab.title}</span>
    })

    return (
      <Modal centered className='login-modal' show={openModalLogin} onHide={this.close}>
        <Modal.Header className='text-center' closeButton>
          <Modal.Title className='modal-title w-100'>{tabsButtons}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment hidden={currentTab === 'registration'}>
            <LoginForm />
          </Fragment>
          <Fragment hidden={currentTab === 'login'}>
            <RegistrationForm />
          </Fragment>
        </Modal.Body>
      </Modal>
    )
  }
}

export default injectIntl(LoginModal)
