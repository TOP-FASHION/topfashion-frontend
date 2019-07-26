import React, { Component } from 'react'
import Fragment from '@finnplay/ui/Fragment'
import { $ } from '@finnplay/ui'
import { injectIntl } from 'react-intl'
import setMessages from '@finnplay/core/utils/setMessages'
import EmailForm from '../../../../projects/finnplay/seed/src/components/EmailForm/index'
import ModalUrl from '../ModalUrl'
import messages from './EmailModal.messages'
import Redirect from '../../../../projects/finnplay/seed/src/components/Redirect/index'

class EmailModal extends Component {
  messages = setMessages(this, messages, 'modals.email.')

  loginType(core) {
    return core.item('loginByToken').item('t') ? 'loginByToken' : 'login'
  }

  render() {
    return (
      <Fragment>
        {$(c => {
          const exception = c.item(this.loginType(c)).callError() || {}
          // Set token for auto login
          if (exception.token) {
            c.item('autoLogin').item('t', exception.token)
          }
          return (
            <ModalUrl
              id="email"
              title={this.messages('title')}
              disableCloseIcon
            >
              <Fragment>
                {$(c =>
                  !c.item('loggedIn') &&
                  exception.errorCode === 222 &&
                  c.item('autoLogin').item('t') ? (
                    <EmailForm />
                  ) : (
                    <Redirect search={{ modal: undefined }} />
                  )
                )}
              </Fragment>
            </ModalUrl>
          )
        })}
      </Fragment>
    )
  }
}

export default injectIntl(EmailModal)
