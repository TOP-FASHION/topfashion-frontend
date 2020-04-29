import { decorate, observable, action } from 'mobx';
import Api from '../Api';

export default class MenuStore {
  menu;

  getMenu() {
    return Api.Menus.Menu()
      .then((res) => {
        this.setMenu(res.data.items);
        return res.data.items;
      })
      .catch((error) => {
        console.log('Error====', error);
      });
  }

  setMenu = (data) => {
    this.menu = data;
  };
}

decorate(MenuStore, {
  menu: observable,
  setMenu: action,
});
