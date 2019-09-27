import WPnonce from "./WPnonce"
import ValidateAuthCookie from './ValidateAuthCookie'
import Login from './Login'
import Products from './Products'

const Api = {
  wpNonce: new WPnonce(),
  ValidateAuthCookie,
  login: new Login(),
  products: new Products(),
}

export default Api
