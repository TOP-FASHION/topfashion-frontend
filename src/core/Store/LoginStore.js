import { observable, action, computed, autorun, when, runInAction } from 'mobx'
import Api from '../Api'
import Cookies from 'js-cookie'

export default class LoginStore {
  @observable username
  @observable password
  @observable token
  @observable isLoggedIn

  constructor () {
    this.token = Cookies.get('auth')
  }

  @action
  validateAuth = async () => {
    try {
      const value = await Api.ValidateAuthCookie({cookie: this.token})
      this.isLoggedIn = value.valid
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }

  }

  // @computed get isLoggedIn() {
  //   console.log('this.user===', this.user)
  //   return this.user
  // }

  @action.bound onUsernameChange(event) {
    this.username = event.target.value
  }

  @action.bound onPasswordChange(event) {
    this.password = event.target.value
  }

  @action signIn = async () =>  {
    let postData = {}
    postData.username = this.username
    postData.password = this.password

    Api.wpNonce.getWPnonce('generate_auth_cookie').then(res => {
      if (res) {
        Api.login.signIn(postData)
          .then(res => {
            if (res.cookie) {
              Cookies.set('auth', res.cookie);
              this.isLoggedIn = true
            }
          })
          .catch(error => {
            console.log("Error====", error)
          });
      }
    })
  }

  @action logout() {
    this.isLoggedIn = false
    Cookies.remove('auth')
  }
}
