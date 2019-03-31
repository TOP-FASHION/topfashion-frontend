import React from 'react'
import {injectIntl} from 'react-intl'
import messages from './FooterMenu.messages'

import setMessages from '@finnplay/core/utils/setMessages'
import SettingsMenu from '../../../../../projects/finnplay/seed/src/components/SettingsMenu/index'

class FooterMenu extends React.Component {
  messages = setMessages(this, messages, 'app.footerMenu.')

  render () {
    return (
      <SettingsMenu
        id='footerMenu'
        messages={this.messages}
        className='footer-menu'
        scrollTo
      />
    )
  }
}

export default injectIntl(FooterMenu)
