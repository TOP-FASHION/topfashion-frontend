import React from 'react'

export function withId(Component) {
  Component.prototype.id = `${Date.now()}${Math.random()}`
  return Component
}

export default Component =>
  class extends React.Component {
    id = `${Date.now()}${Math.random()}`

    render() {
      return <Component id={this.id} {...this.props} />
    }
  }
