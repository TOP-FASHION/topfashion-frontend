import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { Form } from 'react-bootstrap'
import Field from '../../components/Field'
import Input from '../../components/Input'
import Button from '../../components/Button'
import messages from './LoginForm.messages'
import setMessages from '../../utils/setMessages'

@inject('loginStore')
@observer
class LoginForm extends Component {
  messages = setMessages(this, messages, 'app.form.login.')

  render () {
    const { onFieldChange, form } = this.props.loginStore

    return (
      <Form>
        <Field
          className='login__field'
          label={this.messages('email')}
          error={form.fields.email.error}
        >
          <Input
            autoFocus
            type='text'
            placeholder={this.messages('email.placeholder')}
            onChange={onFieldChange}
            value={form.fields.email.value}
            name='email'
          />
        </Field>
        <Field
          className='login__field'
          label={this.messages('password')}
          error={form.fields.password.error}
        >
          <Input
            autoFocus
            type='password'
            placeholder={this.messages('password.placeholder')}
            onChange={onFieldChange}
            value={form.fields.password.value}
            name='password'
          />
        </Field>
        <div className='text-center'>
          <Button
            variant='primary'
            onClick={() => this.props.loginStore.signIn()}
            className={'btn'}
            disabled={!form.meta.isValid}
          >
            {this.messages('login.button')}
          </Button>
        </div>
      </Form>
    )
  }
}

export default injectIntl(LoginForm)
