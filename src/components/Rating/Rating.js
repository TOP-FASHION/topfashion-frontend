import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Rating.scss'

function Rating (props) {
  const { value } = props

  const stars = [1, 2, 3, 4, 5].map(rating => {
    const rootClasses = classNames('rating__star', {
      'rating__star--active': value >= rating
    })

    console.log('rootClasses', rootClasses)

    return <i key={rating} className={`fas fa-star ${rootClasses}`} />
  })

  return (
    <div className='rating'>
      <div className='rating__body'>{stars}</div>
    </div>
  )
}

Rating.propTypes = {
  value: PropTypes.number
}
Rating.defaultProps = {
  value: 0
}

export default Rating
