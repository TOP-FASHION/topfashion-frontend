import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import searchParse from '@finnplay/core/utils/text/url/searchParse'
import searchStringify from '@finnplay/core/utils/text/url/searchStringify'
import onlyServer from '@finnplay/core/utils/env/onlyServer'
import Link from '../../../projects/finnplay/seed/src/components/Link/index'

class ModalLink extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.any,
    location: PropTypes.object
  }

  get link () {
    if (onlyServer()) {
      return ''
    }
    const { id, options, location } = this.props
    const { search } = location
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
    return searchStringify(searchParsed)
  }

  render () {
    const { id, location, options, ...props } = this.props
    return <Link {...props} to={this.link} />
  }
}

export default props => (
  <Switch>
    <Route
      component={({ location }) => <ModalLink location={location} {...props} />}
    />
  </Switch>
)
