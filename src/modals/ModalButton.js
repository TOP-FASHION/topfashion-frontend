import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@finnplay/ui/Button'
import { withRouter } from 'react-router-dom'
import searchParse from '@finnplay/core/utils/text/url/searchParse'
import searchStringify from '@finnplay/core/utils/text/url/searchStringify'

export default withRouter(
  class ModalButton extends Component {
    static propTypes = {
      id: PropTypes.string.isRequired,
      options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      children: PropTypes.any,
      history: PropTypes.object,
      onClick: PropTypes.func,
      delay: PropTypes.number,
      onBeforeOpening: PropTypes.func
    }

    static defaultProps = {
      onBeforeOpening: openModal => openModal(),
      hideOnlyMethod: false
    }

    click = event => {
      this.props.onBeforeOpening(() => {
        const { id, history, onClick, options, delay } = this.props
        const { search } = window.location
        const searchParsed = searchParse(search)
        searchParsed.modal = id
        if (options) {
          let parseOptions = options
          if (typeof parseOptions === 'string') {
            parseOptions = searchParse(parseOptions)
          }
          for (const key in parseOptions) {
            searchParsed[key] = parseOptions[key]
          }
        }
        const result = searchStringify(searchParsed)
        if (result !== search) {
          const run = () =>
            history.push(
              window.location.pathname + result + window.location.hash
            )
          if (delay) {
            setTimeout(run, delay)
          } else {
            run()
          }
        }
        if (onClick) {
          onClick(event)
        }
      })
    }

    render() {
      const {
        children,
        id,
        history,
        options,
        onClick,
        delay,
        ...props
      } = this.props
      return (
        <Button {...props} onClick={this.click}>
          {children}
        </Button>
      )
    }
  }
)
