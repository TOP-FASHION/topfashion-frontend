import React from 'react'
import { injectIntl } from 'react-intl'
import Notification from '@finnplay/ui/Notification'
import { $ } from '@finnplay/ui'
import Markdown from '@finnplay/ui/Markdown'
import { setApiErrors } from '../../../../projects/finnplay/seed/src/translations/apiErrors.messages'

class EmailNotification extends React.Component {
  apiErrors = setApiErrors(this)

  render () {
    return (
      <Notification
        type='error'
        float
        autoHide
        closeDelay
        onClose={$(c => () => {
          c.item('autoLogin').callError('')
        })}
      >
        {$(c =>
          c.item('autoLogin').callError() ? (
            <Markdown text={this.apiErrors(c.item('autoLogin').callError())} />
          ) : null
        )}
      </Notification>
    )
  }
}

export default injectIntl(EmailNotification)
