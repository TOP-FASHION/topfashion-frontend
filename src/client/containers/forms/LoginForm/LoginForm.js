import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { Form } from 'react-bootstrap'
import Field from '../../../components/Field'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import messages from './LoginForm.messages'
import setMessages from '../../../utils/setMessages'

@inject('loginStore')
@observer
class LoginForm extends Component {
  static propTypes = {
    loginStore: PropTypes.any.isRequired
  }

  //messages = setMessages(this, messages, 'app.form.login.')

  render () {
    const { onFieldChange, form } = this.props.loginStore

    return (
      <Form>
        <Field
          className='login__field'
          label={'email'}
          error={form.fields.email.error}
        >
          <Input
            autoFocus
            type='text'
            placeholder={'email.placeholder'}
            onChange={onFieldChange}
            value={form.fields.email.value}
            name='email'
          />
        </Field>
        <Field
          className='login__field'
          label={'password'}
          error={form.fields.password.error}
        >
          <Input
            autoFocus
            type='password'
            placeholder={'password.placeholder'}
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
            {'login.button'}
          </Button>
        </div>
      </Form>
    )
  }
}

export default injectIntl(LoginForm)
