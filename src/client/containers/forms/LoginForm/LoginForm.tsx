import * as React from 'react'
import { observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { Form } from 'react-bootstrap'
import { AppContext } from '../../../core/Store/context'
import Field from '../../../components/Field'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import messages from './LoginForm.messages'
import setMessages from '../../../utils/setMessages'

const LoginForm = observer((props: any) => {
  const { loginStore } = React.useContext(AppContext)
  const message = setMessages(props, messages, 'app.form.login.')
  const { onFieldChange, form } = loginStore

  return (
    <Form>
      <Field
        className='login__field'
        label={message('email')}
        error={form.fields.email.error}
      >
        <Input
          type='text'
          placeholder={message('email.placeholder')}
          onChange={onFieldChange}
          value={form.fields.email.value}
          name='email'
        />
      </Field>
      <Field
        className='login__field'
        label={message('password')}
        error={form.fields.password.error}
      >
        <Input
          type='password'
          placeholder={message('password.placeholder')}
          onChange={onFieldChange}
          value={form.fields.password.value}
          name='password'
        />
      </Field>
      <div className='text-center'>
        <Button
          variant='primary'
          onClick={() => loginStore.signIn()}
          className={'btn'}
          disabled={!form.meta.isValid}
        >
          {message('login.button')}
        </Button>
      </div>
    </Form>
  )
})

export default injectIntl(LoginForm)
