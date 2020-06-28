import { decorate, observable, action } from 'mobx';
import Cookies from 'js-cookie';
import Api from '../../api';

export default class PostStore {
  postContent;

  posts;

  totalPosts;

  pagesPosts;

  getPost(id) {
    const lang = Cookies.get('_lang');
    return Api.Wordpress.Post(id, lang).then((res) => {
      if (res.data) {
        this.setPost(res.data);
      }
    });
  }

  getPosts() {
    return Api.Wordpress.Posts().then((res) => {
      if (res.data) {
        this.setPosts(res.data);
        this.totalPosts = res.headers['x-wp-total'];
        this.pagesPosts = res.headers['x-wp-totalpages'];
      }
    });
  }

  setPost = (data) => {
    this.postContent = data;
  };

  setPosts = (data) => {
    this.posts = data;
  };
}

decorate(PostStore, {
  postContent: observable,
  posts: observable,
  setPost: action,
  setPosts: action,
  totalPosts: observable,
  pagesPosts: observable,
});
