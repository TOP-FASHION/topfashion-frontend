import React, { Component } from 'react'
import OriginalLink from 'react-router-dom/Link'
import PropTypes from 'prop-types'


export const LinkOptions = {
  savedModals: []
}

// Attention: copy your changes to StaticContent

class Link extends Component {
  static propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    className: PropTypes.string,
    /** one of 'add' or 'remove' */
    localePrefix: PropTypes.oneOf(['add', 'remove']),
    exact: PropTypes.bool,
    target: PropTypes.string,
    subLinks: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    scrollTo: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])),
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number
    ]),
    scrollToDelay: PropTypes.number,
    saveModal: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    clearModal: PropTypes.bool,
    onClick: PropTypes.func
  }
  static defaultProps = {
    onClick: () => {},
    scrollToDelay: 0
  }
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.shape({
        location: PropTypes.shape({
          pathname: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }


  set scrollTop (value) {
    document.documentElement.scrollTop = value
    document.body.scrollTop = value
  }
  get scrollTop () {
    return document.documentElement.scrollTop || document.body.scrollTop
  }

  get saveModal () {
    const {saveModal} = this.props

    return saveModal || ''
  }
  get to () {
    if (!this.props.to) return

    if (!this.props.to.startsWith('/') && !this.props.to.startsWith('?')) {
      return this.props.to
    }
    if (this.props.target && this.props.target !== '_self') {
      return this.props.to
    } else {
      return this.props.to
    }
  }
  onClick = () => {
    const {onClick, scrollTo, clearModal} = this.props
    if (clearModal) {
      LinkOptions.savedModals = []
    } else {
      const {saveModal} = this
      if (saveModal) {
        LinkOptions.savedModals.push(saveModal)
      }
    }
    if (scrollTo || scrollTo === 0) {
      this.scrollToPromise = new Promise(resolve => {
        /* global getComputedStyle, MutationObserver */
        if (getComputedStyle(document.body).overflow === 'hidden') {
          window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
          const observer = new MutationObserver(() => {
            if (getComputedStyle(document.body).overflow !== 'hidden') {
              setTimeout(resolve, this.props.scrollToDelay)
              observer.disconnect()
            }
          })
          observer.observe(document.body, {attributes: true})
        } else {
          setTimeout(resolve, this.props.scrollToDelay)
        }
      })
      this.scrollTo(scrollTo)
    }
    onClick()
  }
  scrollTo = scrollTo => {
    const scrollType = typeof scrollTo
    if (scrollType === 'string') {
      this.scrollToPromise = this.scrollToPromise.then(() => {
        const el = document.querySelector(scrollTo)
        if (el) el.scrollIntoView()
      })
    } else if (scrollType === 'boolean') {
      this.scrollToPromise = this.scrollToPromise.then(() => {
        this.scrollTop = 0
      })
    } else if (scrollTo instanceof Array) {
      scrollTo.forEach(this.scrollTo)
    } else {
      this.scrollToPromise = this.scrollToPromise.then(() => {
        this.scrollTop = this.props.scrollTo === scrollTo ? scrollTo : this.scrollTop + scrollTo
      })
    }
  }
  render () {
    const {intl, localePrefix, to, children, exact, subLinks, saveModal, clearModal, target, scrollTo, scrollToDelay, ...props} = this.props
    const link = this.to
    const Element = !link ? 'span' : !link.startsWith('/') && !link.startsWith('?') ? 'a' : OriginalLink
    const href = Element === 'a' ? {href: link, target} : Element === 'span' ? {} : {to: link, target}
    return (
      <Element {...props} onClick={this.onClick} exact={exact ? 'true' : 'false'} {...href}>
        {children}
      </Element>
    )
  }
}

export default Link
