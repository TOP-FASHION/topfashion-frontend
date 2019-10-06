import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Form, Button } from 'react-bootstrap'
import messages from './LoginForm.messages'
import setMessages from '../../utils/setMessages'

@inject('loginStore')
@observer
class LoginForm extends Component {
  messages = setMessages(this, messages, 'app.form.login.')

  @observable authenticationError

  submit = () => {
    this.props.loginStore.signIn()
  }

  render () {
    const {
      username,
      password,
      onUsernameChange,
      onPasswordChange
    } = this.props.loginStore

    return (
      <Form noValidate>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>{this.messages('email')}</Form.Label>
          <Form.Control
            type='email'
            placeholder={this.messages('email.placeholder')}
            value={username}
            onChange={onUsernameChange}
          />
          <Form.Text className='text-muted'>
            {this.messages('email.description')}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>{this.messages('password')}</Form.Label>
          <Form.Control
            type='password'
            placeholder={this.messages('password.placeholder')}
            value={password}
            onChange={onPasswordChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button onClick={this.submit}>{this.messages('login.button')}</Button>
      </Form>
    )
  }
}

export default injectIntl(LoginForm)
