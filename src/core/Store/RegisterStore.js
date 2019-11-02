import { observable, action } from 'mobx'
import Api from '../Api'

export default class RegisterStore {
  @observable username
  @observable password
  @observable onLoggedIn

  constructor () {
    this.username = ""
    this.password = ""
    this.onLoggedIn = false
  }

  @action.bound onUsernameChange(event) {
    this.username = event.target.value;
  }

  @action.bound onPasswordChange(event) {
    this.password = event.target.value;
  }

  @action signIn () {
    let postData = {}
    postData.username = this.username
    postData.password = this.password
    Api.Wordpress.login.signIn(postData).then(res => {
      if (res) {
        this.onLoggedIn = true
        localStorage.setItem( 'login', res.cookie );
      }
    })
  }
}
