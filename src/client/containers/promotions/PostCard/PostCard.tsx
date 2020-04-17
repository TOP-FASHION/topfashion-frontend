import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './Postcard.scss'

interface Props {
  post?: any
  layout?: 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm' | any
}

const PostCard = ({ post, layout }: Props) => {
  const cardClasses = classNames(
    'post-card',
    {
      'post-card--layout--grid': ['grid-nl', 'grid-lg'].includes(layout),
      'post-card--layout--list': ['list-nl', 'list-sm'].includes(layout),
      'post-card--size--nl': ['grid-nl', 'list-nl'].includes(layout),
      'post-card--size--lg': layout === 'grid-lg',
      'post-card--size--sm': layout === 'list-sm'
    }
  )
  const categories = post.categories.map((category: any, index: any) => (
    <Link key={index} to='/'>{category}</Link>
  ))

  return (
    <div className={cardClasses}>
      <div className='post-card__image'>
        <Link to={`/promotions-news/${post.id}`}>
          <img src={post.better_featured_image.media_details.sizes.shop_single.source_url} alt='' />
        </Link>
      </div>
      <div className='post-card__info'>
        <div className='post-card__category'>
          {categories}
        </div>
        <div className='post-card__name'>
          <Link to='/promotions-news/post'>{post.title.rendered}</Link>
        </div>
        <div className='post-card__date'>{post.date}</div>
        <div className='post-card__content d-none'>{post.slug}</div>
        <div className='post-card__read-more'>
          <Link to={`/promotions-news/${post.id}`} className='btn btn-secondary btn-sm'>Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
