import { observable, action, computed, autorun, when, runInAction } from 'mobx'
import Api from '../Api'
import Cookies from 'js-cookie'

export default class LoginStore {
  @observable username
  @observable password
  @observable token
  @observable loggedIn = false

  constructor () {
    this.token = Cookies.get('auth')
    autorun(() => this.validateAuth())
  }

  @action
  validateAuth = async () => {
    try {
      const value = await Api.Wordpress.ValidateAuthCookie({cookie: this.token})
      this.loggedIn = value.data.valid
      new Event('login');
      var event = new CustomEvent('login', { 'detail':  {'status': value.data.valid} });
      window.dispatchEvent(event);
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  }

  @computed get isLoggedIn() {
     return this.loggedIn
  }

  @action.bound onUsernameChange(event) {
    this.username = event.target.value
  }

  @action.bound onPasswordChange(event) {
    this.password = event.target.value
  }

  @action signIn = async () =>  {
    let postData = {}
    postData.email = this.username
    postData.password = this.password

    Api.Wordpress.Login(postData)
      .then(res => {
        if (res.data.cookie) {
          Cookies.set('auth', res.data.cookie);
          this.loggedIn = true
        }
      })
      .catch(error => {
        console.log("Error====", error)
      });
  }

  @action logout() {
    this.loggedIn = false
    Cookies.remove('auth')
  }
}
