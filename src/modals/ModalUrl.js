import React, { Component } from 'react'
import {injectIntl} from 'react-intl'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import Modal from '@finnplay/ui/Modal'
import searchParse from '@finnplay/core/utils/text/url/searchParse'
import {LinkOptions} from '../../../projects/finnplay/seed/src/components/Link/Link'
import searchStringify from '@finnplay/core/utils/text/url/searchStringify'
import messages from './ModalUrl.messages'
import setMessages from '@finnplay/core/utils/setMessages'
import Fragment from '@finnplay/ui/Fragment'
import Markdown from '@finnplay/ui/Markdown'
import {$} from '@finnplay/ui'

class ModalUrl extends Component {
  messages = setMessages(this, messages, 'app.modal.')
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    open: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    children: PropTypes.any,
    location: PropTypes.object,
    history: PropTypes.object,
    close: PropTypes.func,
    onClose: PropTypes.func,
    closeType: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(['back', 'replace'])]),
    disableCloseIcon: PropTypes.bool
  }
  static defaultProps = {
    open: true
  }
  get idFromUrl () {
    return searchParse(this.props.location.search).modal
  }
  close = () => {
    const {location, history} = this.props
    const search = searchParse(location.search)
    const {savedModals} = LinkOptions
    if (savedModals.length) {
      search.modal = savedModals.pop()
    } else {
      delete search.modal
    }
    history.push(location.pathname + searchStringify(search))
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
  componentWillMount () {
    const close = this.props.close
    if (close) {
      close(this.close)
    }
  }
  render () {
    const {id, open, children, title, location, history, ...props} = this.props
    const isOpen = open && (typeof id === 'function' ? !!id(this.idFromUrl) : this.idFromUrl === id)
    const currentTitle = typeof title === 'function' ? title(this.idFromUrl) : title
    return children ? (
      <Modal
        {...props}
        open={isOpen}
        title={currentTitle}
        onClose={this.props.disableCloseIcon ? undefined : this.close}
      >
        {children}
        <Fragment hidden={$(c => !c.item('ukRules').item('general'))}>
          <Markdown className='modal__gambling-message' text={this.messages('gambling.message')} />
        </Fragment>
      </Modal>
    ) : null
  }
}

export default injectIntl(props => (
  <Switch>
    <Route component={({history, location}) => <ModalUrl history={history} location={location} {...props} />} />
  </Switch>
))
