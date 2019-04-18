import { observable, action } from 'mobx';
import Api from "../utils/Api/"

class Products {
  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action pullUser() {
    Api.products(['fdsfsd', 'trtdg']).then((res)=>{
      console.log("res", res)

      if (res && res.success) {
        this.res = res;
      }
    })
    return
  }

}

export default new Products();