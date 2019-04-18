import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Thumb from '../../components/Thumb/index'

export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    const { posts } = this.props
    console.log('posts', posts)
    return (
      <ul>
        {posts.map((posts, i) => (
          <li key={i}
              className="shelf-item"
              data-sku={posts.sku}
          >
            {posts.isFreeShipping && (
              <div className="shelf-stopper">Free shipping</div>
            )}
            <Thumb
              classes="shelf-item__thumb"
              src={`https://localhost:8443/tigran-api/api/images/products/${posts.id}/${posts.id_default_image}`}
              alt={posts.title}
            />
            <p className="shelf-item__title">{posts.title}</p>
            <div className="shelf-item__buy-btn">Add to cart</div>
          </li>
        ))}
      </ul>
    )
  }
}