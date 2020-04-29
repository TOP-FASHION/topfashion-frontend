import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Col } from 'react-bootstrap';
import { AppContext } from '../../../core/Store/context';
import Pagination from '../../../components/Pagination';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';
import './ProductTabReviews.scss';

interface Props {
  product?: any;
}

const ProductTabReviews = observer(({ product }: Props) => {
  const { productReviewsStore, productReviewsAddStore } = React.useContext(
    AppContext
  );
  const [page, setPage] = React.useState(1);
  // eslint-disable-next-line camelcase
  const {
    rating,
    review,
    reviewer,
    reviewer_email,
    onReviewerChange,
    onReviewerEmailChange,
    onReviewChange,
    onRatingChange,
  } = productReviewsAddStore;
  const { productReviews } = productReviewsStore;

  React.useEffect(() => {
    productReviewsStore.getProductReviews(product.id, 1);
  }, []);

  const changePage = (page: any) => {
    productReviewsStore.getProductReviews(product.id, page);
    setPage(page);
  };

  const totalPage = Math.ceil(product.rating_count / 3);

  const currentPage =
    product.rating_count === 0 ? 1 : Math.ceil(product.rating_count / 3);

  const reviewsList =
    productReviews && productReviews.length > 0
      ? productReviews.map((review: any, index: any) => (
          <li key={index} className="reviews-list__item">
            <div className="review">
              <div className="review__avatar">
                <img src={review.reviewer_avatar_urls[96]} alt="" />
              </div>
              <div className=" review__content">
                <div className=" review__author">{review.reviewer}</div>
                <div className=" review__rating">
                  <Rating value={review.rating} />
                </div>
                <div className=" review__text">{review.review}</div>
                <div className=" review__date">{review.date_created}</div>
              </div>
            </div>
          </li>
        ))
      : 'Нет отзывов';

  return (
    <div className="reviews-view">
      <div className="reviews-view__list">
        <h3 className="reviews-view__header">Customer Reviews</h3>
        <div className="reviews-list">
          <ol className="reviews-list__content">{reviewsList}</ol>
          <div className="reviews-list__pagination">
            <Pagination
              current={page}
              siblings={2}
              total={totalPage}
              onPageChange={changePage}
            />
          </div>
        </div>
      </div>

      <div className="reviews-view__form">
        <h3 className="reviews-view__header">Write A Review</h3>
        <div className="row">
          <div className="col-12 col-lg-9 col-xl-8">
            <Form noValidate>
              <div className="form-row">
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  as={Col}
                  md={4}
                >
                  <Form.Label>Review Stars</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={onRatingChange}
                  >
                    <option value="5">5 Stars Rating</option>
                    <option value="5">4 Stars Rating</option>
                    <option value="3">3 Stars Rating</option>
                    <option value="2">2 Stars Rating</option>
                    <option value="1">1 Stars Rating</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" as={Col} md={4}>
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={reviewer}
                    onChange={onReviewerChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" as={Col} md={4}>
                  <Form.Label>Email Address</Form.Label>
                  {/* eslint-disable-next-line camelcase */}
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={reviewer_email}
                    onChange={onReviewerEmailChange}
                  />
                </Form.Group>
              </div>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={review}
                  onChange={onReviewChange}
                />
              </Form.Group>
              <Button
                onClick={() =>
                  productReviewsAddStore.addReview(product.id, currentPage)
                }
                className="btn btn-primary btn-lg"
              >
                Post Your Review
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductTabReviews;
