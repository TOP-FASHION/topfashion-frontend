import React from 'react'
import Redirect from 'react-router-dom/Redirect'

class RedirectToHome extends React.Component {
  render () {
    return <Redirect to='/' />
  }
}

export default RedirectToHome
