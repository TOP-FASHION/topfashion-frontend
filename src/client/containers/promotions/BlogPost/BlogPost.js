import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './BlogPost.scss'

export default function BlogPost (props) {
  const { layout, content } = props

  const postClasses = classNames('post__content typography', {
    'typography--expanded': layout === 'full'
  })
  console.log('content', content)
  // const relatedPostsList = posts.slice(0, 2).map((relatedPost) => (
  //   <div key={relatedPost.id} className='related-posts__item post-card post-card--layout--related'>
  //     <div className='post-card__image'>
  //       <Link to='/'>
  //         <img src={relatedPost.image} alt='' />
  //       </Link>
  //     </div>
  //     <div className='post-card__info'>
  //       <div className='post-card__name'>
  //         <Link to='/'>{relatedPost.title}</Link>
  //       </div>
  //       <div className='post-card__date'>{relatedPost.date}</div>
  //     </div>
  //   </div>
  // ))

  return (
    <div className={`block post post--layout--${layout}`}>
      <div className={`post__header post-header post-header--layout--${layout}`}>
        <div className='post-header__categories'>
          <Link to='/promotions-news'>Latest news</Link>
        </div>
        <h1 className='post-header__title'>{content.title.rendered}</h1>
        <div className='post-header__meta'>
          <div className='post-header__meta-item'><Link to='/'>{content.date_gmt}</Link></div>
        </div>
      </div>

      <div className={postClasses} dangerouslySetInnerHTML={{ __html: content.content.rendered }} />

      <div className='post__footer'>
        <div className='post__tags-share-links'>
          <div className='post__tags tags'>
            <div className='tags__list'>
              <Link to='/'>Promotion</Link>
              <Link to='/'>Power Tool</Link>
              <Link to='/'>Wrench</Link>
              <Link to='/'>Electrodes</Link>
            </div>
          </div>
          <div className='post__share-links share-links'>
            <ul className='share-links__list'>
              <li className='share-links__item share-links__item--type--like'><Link to='/'>Like</Link></li>
              <li className='share-links__item share-links__item--type--tweet'><Link to='/'>Tweet</Link></li>
              <li className='share-links__item share-links__item--type--pin'><Link to='/'>Pin It</Link></li>
              <li className='share-links__item share-links__item--type--counter'><Link to='/'>4K</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <section className='post__section'>
        <h4 className='post__section-title'>Related Posts</h4>
        <div className='related-posts'>
          <div className='related-posts__list'>
            {/* {relatedPostsList} */}
          </div>
        </div>
      </section>
    </div>
  )
}

BlogPost.propTypes = {
  /**
   * post layout
   * one of ['classic', 'full'] (default: 'classic')
   */
  layout: PropTypes.oneOf(['classic', 'full']),
  content: PropTypes.any
}

BlogPost.defaultProps = {
  layout: 'classic'
}