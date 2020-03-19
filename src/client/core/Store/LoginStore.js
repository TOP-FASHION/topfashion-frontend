/* global Event, CustomEvent */
import { observable, action, computed, autorun, runInAction, toJS } from 'mobx'
import Api from '../Api'
import Cookies from 'js-cookie'
import Validator from 'validatorjs'

export default class LoginStore {
  @observable token

  @observable loggedIn = false

  @observable statusLogin = ''

  @observable messageStatusLogin = ''

  @observable form = {
    fields: {
      email: {
        value: '',
        error: null,
        rule: 'required|email'
      },
      password: {
        value: '',
        error: null,
        rule: 'required'
      }
    },
    meta: {
      isValid: false,
      error: null,
      message: null
    }
  }

  constructor (rootStore) {
    document.body.classList.add('preloading')
    this.rootStore = rootStore
    this.token = Cookies.get('auth')
    autorun(() => this.validateAuth())
  }

  @action
  validateAuth = async () => {
    try {
      const value = await Api.Wordpress.ValidateAuthCookie({ cookie: this.token })
      this.loggedIn = value.data.valid
      // eslint-disable-next-line no-new
      new Event('login')
      const event = new CustomEvent('login', { detail: { status: value.data.valid } })
      window.dispatchEvent(event)
      this.rootStore.userInfoStore.getUserInfo()
    } catch (error) {
      runInAction(() => {
        this.status = 'error'
      })
    }
  }

  @computed get isLoggedIn () {
    return this.loggedIn
  }

  getFlattenedValues = (valueKey = 'value') => {
    const data = {}
    const form = toJS(this.form).fields
    Object.keys(form).map(key => {
      data[key] = form[key][valueKey]
    })
    return data
  };

  @action onFieldChange = (field, value) => {
    this.form.fields[field.target.name].value = field.target.value
    Validator.useLang(Cookies.get('_lang'))
    const validation = new Validator(
      this.getFlattenedValues('value'),
      this.getFlattenedValues('rule'))
    this.form.meta.isValid = validation.passes()
    this.form.fields[field.target.name].error = validation.errors.first(field.target.name)
  };

  @action signIn () {
    if (!this.form.meta.isValid) {
      return Promise.resolve(null)
    }
    const postData = {}
    postData.email = this.form.fields.email.value
    postData.password = this.form.fields.password.value

    return Api.Wordpress.Login(postData)
      .then(res => {
        if (res.data.cookie) {
          Cookies.set('auth', res.data.cookie)
          this.loggedIn = true
          this.messageStatusLogin = res.data.status
          this.statusLogin = res.data.status
          this.rootStore.modalStore.isOpenModalLogin = false
          this.rootStore.userInfoStore.getUserInfo()
        }
        if (res.data.status === 'error') {
          this.messageStatusLogin = res.data.error
          this.statusLogin = res.data.status
        }
        return res.data
      })
      .catch(error => {
        console.log('Error====', error)
      })
  }

  @action logout () {
    this.loggedIn = false
    Cookies.remove('auth')
  }

  @action clear () {
    this.statusLogin = ''
    this.messageStatusLogin = ''
  }
}
