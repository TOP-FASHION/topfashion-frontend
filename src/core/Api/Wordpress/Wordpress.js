import Login from './Login'
import ValidateAuthCookie from './ValidateAuthCookie'

/** @typedef {BillfoldClass|Billfold} Billfold */
export default class Wordpress {
  /** @type {Login} */
  login = new Login(this)
  /** @type {ValidateAuthCookie} */
  validateAuthCookie = new ValidateAuthCookie(this)
}
