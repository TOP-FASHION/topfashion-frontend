import { decorate, observable, action } from 'mobx'
import Api from '../Api'
import Cookies from 'js-cookie'

export default class PostStore {
  postContent

  posts

  getPost (id) {
    const lang = Cookies.get('_lang')
    return Api.Wordpress.Post(id, lang).then(res => {
      if (res.data) {
        this.setPage(res.data)
      }
    })
  }

  getPosts () {
    return Api.Wordpress.Posts().then(res => {
      if (res.data) {
        this.setPosts(res.data)
      }
    })
  }

  setPost = data => {
    this.postContent = data
  }

  setPosts = data => {
    this.posts = data
  }
}

decorate(PostStore, {
  postContent: observable,
  posts: observable,
  setPost: action,
  setPosts: action
})
