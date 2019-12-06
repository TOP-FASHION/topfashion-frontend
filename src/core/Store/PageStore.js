import { decorate, observable, action } from 'mobx'
import Api from '../Api'
import Cookies from 'js-cookie'

export default class PageStore {
  pageContent

  getPage (id) {
    const lang = Cookies.get('_lang')
    return Api.Wordpress.Page(id, lang).then(res => {
      if (res.data) {
        this.setPage(res.data)
      }
    })
  }

  setPage = data => {
    this.pageContent = data
  }
}

decorate(PageStore, {
  pageContent: observable,
  setData: action
})