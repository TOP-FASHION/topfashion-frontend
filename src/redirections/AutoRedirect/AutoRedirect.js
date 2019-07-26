import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import searchStringify from '@finnplay/core/utils/text/url/searchStringify'
import Redirect from '../../../../projects/finnplay/seed/src/components/Redirect/index'
import { withCore } from '../../utils/withCore'

@withCore
class AutoRedirect extends React.Component {
  static propTypes = {
    if: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
    reset: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    start: PropTypes.func,
    stop: PropTypes.func,
    check: PropTypes.func,
    noStart: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    pathname: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    search: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
      PropTypes.string
    ]),
    push: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    location: PropTypes.object
  }

  static defaultProps = {
    reset: false,
    noStart: false
  }

  static stream(core) {
    for (let i = 0; i < AutoRedirect.id; i++) {
      core.item('ui').item('$AutoRedirect.streamId', i)
    }
    setTimeout(() => {
      core.item('ui').item('$AutoRedirect.streamId', undefined)
    })
  }

  static id = 0

  id = AutoRedirect.id++

  get if() {
    let result = this.props.if
    if (typeof result === 'function') {
      result = result(this.core)
    }
    return result
  }

  get to() {
    let { to } = this.props
    if (typeof to === 'function') {
      to = to(this.core)
    }
    return to || this.pathname + this.search
  }

  get pathname() {
    let { pathname } = this.props
    if (typeof pathname === 'function') {
      pathname = pathname(this.core)
    }
    return pathname || this.props.location.pathname
  }

  get search() {
    let { search = this.props.location.search } = this.props
    if (typeof search === 'function') {
      search = search(this.core)
    }
    if (typeof search === 'object') {
      for (const key in search) {
        if (search[key] === undefined) {
          delete search[key]
        }
      }
      search = searchStringify(search)
    }
    if (search && !search.startsWith('?')) {
      search = `?${search}`
    }
    return search
  }

  get push() {
    let { push } = this.props
    if (typeof push === 'function') {
      push = push(this.core)
    }
    return push
  }

  reset(action) {
    const { reset } = this.props
    if (reset === true) {
      action()
    } else if (typeof reset === 'function') {
      reset(action, this.core)
    }
  }

  get checkCondition() {
    const { to } = this
    const { pathname, search } = this.props.location
    const currentUrl = pathname + search

    if (to && to !== currentUrl) {
      return (
        !this.core.item('ui').item(`$AutoRedirect.redirected.${this.id}`) &&
        this.if
      )
    }
    return false
  }

  get checkId() {
    if (this.core.item('ui').item('$AutoRedirect.streamId') === undefined) {
      setTimeout(() => {
        if (this.core.item('ui').item('$AutoRedirect.streamId') === undefined) {
          AutoRedirect.stream(this.core)
        }
      })
      return false
    }
    return this.core.item('ui').item('$AutoRedirect.streamId') === this.id
  }

  redirect() {
    this.core.item('ui').item(`$AutoRedirect.redirected.${this.id}`, true)
    this.reset(() =>
      this.core.item('ui').item(`$AutoRedirect.redirected.${this.id}`, false)
    )
    return true
  }

  get isRedirect() {
    if (this.checkCondition && this.checkId) {
      this.redirect()
      return true
    }
    return false
  }

  componentDidMount() {
    if (this.props.start) {
      this.props.start(this.start)
    }
    if (this.props.stop) {
      this.props.stop(this.stop)
    }
    if (this.props.check) {
      this.props.check(this.check)
    }
  }

  start = () =>
    this.core.item('ui').item(`$AutoRedirect.redirected.${this.id}`, false)

  stop = () =>
    this.core.item('ui').item(`$AutoRedirect.redirected.${this.id}`, true)

  check = () => {
    this.start()
    this.stop()
  }

  render() {
    if (!this.core.item('ui').has(`$AutoRedirect.redirected.${this.id}`)) {
      this.core
        .item('ui')
        .item(`$AutoRedirect.redirected.${this.id}`, this.props.noStart)
    }
    return this.isRedirect ? (
      <Redirect
        to={this.to}
        pathname={this.pathname}
        search={this.search}
        push={this.push}
      />
    ) : null
  }
}

export default props => (
  <Switch>
    <Route
      render={({ location }) => <AutoRedirect location={location} {...props} />}
    />
  </Switch>
)
