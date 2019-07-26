import React from 'react'
import AutoRedirect from '../AutoRedirect/index'

export default class AutoRedirectToBlocked extends React.Component {
  if = core => {
    const settings = core.get('settings').get('fe')
    const countries = settings.item('allowedCountries')
      ? settings.item('allowedCountries').items()
      : []
    return (
      countries.length &&
      !~countries.indexOf(core.item('settings').item('country')) &&
      !core.item('settings').itemLoading('country')
    )
  }

  render () {
    return <AutoRedirect if={this.if} to='/blocked' reset />
  }
}
