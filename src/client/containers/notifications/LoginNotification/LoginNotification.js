import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { inject, observer } from 'mobx-react'
import { toast } from 'react-toastify'
import messages from './LoginNotification.messages'
import setMessages from '../../../utils/setMessages'
import Fragment from '../../../components/Fragment'

@inject('loginStore')
@observer
class LoginNotification extends React.Component {
  static propTypes = {
    loginStore: PropTypes.any
  }

  messages = setMessages(this, messages, 'app.globalNotification.login.status.')

  statusTypes = {
    error: 'error',
    ok: 'success'
  }

  notify = () => {
    toast(this.messages(this.statusTypes[this.props.loginStore.statusLogin], {
      error: this.props.loginStore.messageStatusLogin
    }), {
      type: this.statusTypes[this.props.loginStore.statusLogin] || 'default',
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => this.props.loginStore.clear()
    })
  };

  render () {
    return this.props.loginStore.statusLogin ? (
      <Fragment>
        {this.notify(this.props.loginStore.messageStatusLogin)}
      </Fragment>
    ) : null
  }
}

export default injectIntl(LoginNotification)
