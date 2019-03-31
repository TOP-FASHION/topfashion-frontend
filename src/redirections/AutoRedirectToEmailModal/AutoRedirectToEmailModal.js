import React from 'react'
import AutoRedirect from '../AutoRedirect/index'

export default class AutoRedirectToEmailModal extends React.Component {
  loginType (core) {
    return core.item('loginByToken').item('t') ? 'loginByToken' : 'login'
  }

  if = core => {
    return (
      !core.item('loggedIn') && (core.item(this.loginType(core)).callError() || {}).errorCode === 222
    )
  }

  reset = (reset, core) => {
    const subscribe = () => {
      core._api.billfold.login.unsubscribe(subscribe)
      core.await.then(reset, reset)
    }
    core._api.billfold.login.subscribe(subscribe)
  }

  render () {
    return <AutoRedirect
      if={this.if}
      reset={this.reset}
      search='modal=email'
      push
    />
  }
}
