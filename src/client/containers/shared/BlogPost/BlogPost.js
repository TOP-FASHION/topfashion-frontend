import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './BlogPost.scss'

export default function BlogPost (props) {
  const { layout } = props

  const postClasses = classNames('post__content typography', {
    'typography--expanded': layout === 'full'
  })

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
          <Link to='/'>Latest news</Link>
        </div>
        <h1 className='post-header__title'>Morbi Interdum Velit Quis Magna Placerat Lobortis Eget</h1>
        <div className='post-header__meta'>
          <div className='post-header__meta-item'>
            By
            <Link to='/'>Jessica Moore</Link>
          </div>
          <div className='post-header__meta-item'><Link to='/'>November 30, 2018</Link></div>
          <div className='post-header__meta-item'><Link to='/'>4 Comments</Link></div>
        </div>
      </div>

      <div className={postClasses}>
        <p>
          Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi
          interdum velit quis magna placerat lobortis eget pharetra magna. Nulla
          tristique sollicitudin turpis, eget maximus risus faucibus non. Nulla
          vestibulum ipsum risus, vitae maximus nunc bibendum quis.
        </p>
        <p>
          raesent eu consequat nibh. Quisque
          <i>ullamcorper</i>
          , augue eu fringillasodales, leo metus volutpat risus, at suscipit ipsum
          diam eget sem. Maecenas dictum elit in enim molestie,
          <Link to='/'>vel sollicitudin erat ultricies</Link>
          . Sed risus tellus, molestie finibus
          dui quis, suscipit consequat ex.
        </p>
      </div>

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
        <div className='post-author'>
          <div className='post-author__avatar'>
            <Link to='/'><img src='images/avatars/avatar-1.jpg' alt='' /></Link>
          </div>
          <div className='post-author__info'>
            <div className='post-author__name'>
              <Link to='/'>Jessica Moore</Link>
            </div>
            <div className='post-author__about'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              suscipit suscipit mi, non tempor nulla finibus eget. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
      </div>
      <section className='post__section'>
        <h4 className='post__section-title'>Related Posts</h4>
        <div className='related-posts'>
          <div className='related-posts__list'>
            {/*{relatedPostsList}*/}
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
  layout: PropTypes.oneOf(['classic', 'full'])
}

BlogPost.defaultProps = {
  layout: 'classic'
}
