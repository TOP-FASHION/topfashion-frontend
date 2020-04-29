import * as React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import './ProductsBlockHeader.scss';

interface Props {
  title: string;
  arrows: boolean;
  group: string;
  onNext: () => void | Function;
  onPrev: () => void | Function;
}

const ProductsBlockHeader = ({
  title,
  arrows,
  group,
  onNext,
  onPrev,
}: Props) => {
  const arrow = arrows ? (
    <div className="block-header__arrows-list">
      <button
        className="block-header__arrow block-header__arrow--left"
        type="button"
        onClick={onPrev}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        className="block-header__arrow block-header__arrow--right"
        type="button"
        onClick={onNext}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  ) : null;

  return (
    <div className="block-header">
      <h3 className="block-header__title">
        <Link className="link" to={`/category/${group}`}>
          {title}
        </Link>
      </h3>
      {arrow}
    </div>
  );
};

export default injectIntl(ProductsBlockHeader);
