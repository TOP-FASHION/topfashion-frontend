import React from 'react'
import PropTypes from 'prop-types'
import Fragment from '../components/Fragment'

export default class Redirections extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func
      })
    }).isRequired
  }

  listener = ({ data, source, origin }) => {
    if (origin !== `${window.location.protocol}//${window.location.host}`) {
      return
    }
    if (data.type === 'redirect') {
      source.postMessage({ type: 'redirect', value: true }, '*')
      this.context.router.history.push(data.value)
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.listener)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.listener)
  }

  render() {
    return <Fragment>ewr</Fragment>
  }
}
