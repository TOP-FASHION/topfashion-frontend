import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostCard from '../../components/PostCard'
import ProductsBlockHeader from '../../containers/ProductsBlockHeader'
import SlickWithPreventSwipeClick from '../../components/SlickWithPreventSwipeClick'
import './PostsSlider.scss'

const slickSettings = {
  'grid-nl': {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  'list-sm': {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
};

class PostsSlider extends Component {
  handleNextClick = () => {
    if (this.slickRef) {
      this.slickRef.slickNext();
    }
  };

  handlePrevClick = () => {
    if (this.slickRef) {
      this.slickRef.slickPrev();
    }
  };

  setSlickRef = (ref) => {
    this.slickRef = ref;
  };

  render() {
    const { title, layout, posts } = this.props

    const postsList = posts.map((post) => <PostCard key={post.id} post={post} />);
    return (
      <div className={`block block-posts block-posts--layout--${layout}`} data-layout={layout}>
        <div className="container">
          <ProductsBlockHeader
            arrows
            title={title}
            onNext={this.handleNextClick}
            onPrev={this.handlePrevClick}
          />

          <div className="block-posts__slider">
            <SlickWithPreventSwipeClick
              ref={this.setSlickRef}
              {...slickSettings[layout]}
            >
              {postsList}
            </SlickWithPreventSwipeClick>
          </div>
        </div>
      </div>
    );
  }
}

PostsSlider.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['list-sm', 'grid-nl']),
  posts: PropTypes.array,
};

PostsSlider.defaultProps = {
  layout: 'list-sm',
  posts: [],
};

export default PostsSlider
