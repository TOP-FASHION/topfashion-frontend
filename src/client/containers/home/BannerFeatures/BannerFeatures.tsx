import React from 'react';
import { injectIntl } from 'react-intl';
import './BannerFeatures.scss';

interface Props {
  layout?: 'classic' | 'boxed';
}

const BannerFeatures = ({ layout = 'boxed' }: Props) => {
  return (
    <div className={`block block-features block-features--layout--${layout}`}>
      <div className="container-fluid">
        <div className="block-features__list">
          <div className="block-features__item">
            <div className="block-features__icon">
              <i className="fas fa-shipping-fast" />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Free Shipping</div>
              <div className="block-features__subtitle">
                For orders from $50
              </div>
            </div>
          </div>
          <div className="block-features__divider" />
          <div className="block-features__item">
            <div className="block-features__icon">
              <i className="fas fa-phone" />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Support 24/7</div>
              <div className="block-features__subtitle">Call us anytime</div>
            </div>
          </div>
          <div className="block-features__divider" />
          <div className="block-features__item">
            <div className="block-features__icon">
              <i className="fas fa-hard-hat" />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">100% Safety</div>
              <div className="block-features__subtitle">
                Only secure payments
              </div>
            </div>
          </div>
          <div className="block-features__divider" />
          <div className="block-features__item">
            <div className="block-features__icon">
              <i className="fas fa-tags" />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Hot Offers</div>
              <div className="block-features__subtitle">
                Discounts up to 90%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(BannerFeatures);
