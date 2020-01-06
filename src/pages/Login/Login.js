import React from 'react'
import LoginForm from '../../containers/shared/LoginForm'

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <div className='xs=12 sm=10 md=6 lg=4'>
          <div className='login'>
            <div className='container text-center'>
              <h4 className='login__title' id='Login'>Логин</h4>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
