import React, {Component} from 'react'
import Pagination from '../../containers/Pagination'
import Rating from '../../components/Rating'
import {inject, observer} from "mobx-react"
import {Form, Col} from 'react-bootstrap'
import Button from '../../components/Button'
import PropTypes from "prop-types"
import './ProductTabReviews.scss'

@inject('productReviewsStore', 'productReviewsAddStore')
@observer
class ProductTabReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  static propTypes = {
    product: PropTypes.object.isRequired,
  }

  componentDidMount () {
    this.props.productReviewsStore.getProductReviews(this.props.product.id, 1)
  }

  get reviews () {
    return this.props.productReviewsStore.productReviews
  }

  submit = () => {
    this.props.productReviewsAddStore.addReview(this.props.product.id)
  }

  changePage = page => {
    this.props.productReviewsStore.getProductReviews(this.props.product.id, page)
    this.setState(() => ({ page }));
  };

  get totalPage () {
    return Math.ceil(this.props.product.rating_count / 3)
  }

  get currentPage () {
    return this.props.product.rating_count === 0 ? 1 : (
      Math.ceil(this.props.product.rating_count / 3)
    )
  }

  get reviewsList () {
    console.log('this.reviews', this.reviews)
    return this.reviews && this.reviews.length > 0 ? this.reviews.map((review, index) => (
      <li key={index} className="reviews-list__item">
        <div className="review">
          <div className="review__avatar"><img src={review.reviewer_avatar_urls[96]} alt="" /></div>
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
    )) : 'Нет отзывов'
  }

  render() {
    const { rating, review, reviewer, reviewer_email, onReviewerChange, onReviewerEmailChange, onReviewChange, onRatingChange } = this.props.productReviewsAddStore
    const { page } = this.state;

    return (
      <div className="reviews-view">
        <div className="reviews-view__list">
          <h3 className="reviews-view__header">Customer Reviews</h3>
          <div className="reviews-list">
            <ol className="reviews-list__content">
              {this.reviewsList}
            </ol>
            <div className="reviews-list__pagination">
              <Pagination
                current={page}
                siblings={2}
                total={this.totalPage}
                onPageChange={this.changePage}
              />
            </div>
          </div>
        </div>

        <form className="reviews-view__form">
          <h3 className="reviews-view__header">Write A Review</h3>
          <div className="row">
            <div className="col-12 col-lg-9 col-xl-8">
              <Form noValidate>
                <div className="form-row">
                  <Form.Group controlId="exampleForm.ControlSelect1" as={Col} md={4}>
                    <Form.Label>Review Stars</Form.Label>
                    <Form.Control as="select" value={rating} onChange={ onRatingChange }>
                      <option value="5">5 Stars Rating</option>
                      <option value="5">4 Stars Rating</option>
                      <option value="3">3 Stars Rating</option>
                      <option value="2">2 Stars Rating</option>
                      <option value="1">1 Stars Rating</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" as={Col} md={4}>
                    <Form.Label>{"Your Name"}</Form.Label>
                    <Form.Control type="text" placeholder={"Your Name"} value={reviewer} onChange={ onReviewerChange } />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox" as={Col} md={4}>
                    <Form.Label>{"Email Address"}</Form.Label>
                    <Form.Control type="email" placeholder={"Email Address"} value={reviewer_email} onChange={ onReviewerEmailChange } />
                  </Form.Group>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control as="textarea" rows="3" value={review} onChange={ onReviewChange } />
                </Form.Group>
                <Button onClick={() => this.props.productReviewsAddStore.addReview(this.props.product.id, this.currentPage)} className="btn btn-primary btn-lg">
                  Post Your Review
                </Button>
              </Form>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductTabReviews
