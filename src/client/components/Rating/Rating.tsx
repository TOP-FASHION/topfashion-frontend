import * as React from 'react';
import classNames from 'classnames';
import './Rating.scss';

interface Props {
  value?: number;
}

function Rating({ value = 0 }: Props) {
  const stars = [1, 2, 3, 4, 5].map((rating) => {
    const rootClasses = classNames('rating__star', {
      'rating__star--active': value >= rating,
    });

    return <i key={rating} className={`fas fa-star ${rootClasses}`} />;
  });

  return (
    <div className="rating">
      <div className="rating__body">{stars}</div>
    </div>
  );
}

export default Rating;
