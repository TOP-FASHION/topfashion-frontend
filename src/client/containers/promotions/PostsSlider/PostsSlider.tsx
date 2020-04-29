import React from 'react';
import PostCard from '../PostCard';
import ProductsBlockHeader from '../../productList/ProductsBlockHeader';
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick';
import './PostsSlider.scss';

const slickSettings: any = {
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
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

interface Props {
  title?: string;
  layout?: 'list-sm' | 'grid-nl';
  posts?: Array<any>;
}

const PostsSlider = ({ title, layout = 'list-sm', posts = [] }: Props) => {
  let slickRef: any;

  const handleNextClick = () => {
    if (slickRef) {
      slickRef.slickNext();
    }
  };

  const handlePrevClick = () => {
    if (slickRef) {
      slickRef.slickPrev();
    }
  };

  const setSlickRef = (ref: any) => {
    slickRef = ref;
  };

  const postsList = posts.map((post) => <PostCard key={post.id} post={post} />);
  return (
    <div
      className={`block block-posts block-posts--layout--${layout}`}
      data-layout={layout}
    >
      <div className="container-fluid">
        <ProductsBlockHeader
          arrows
          title={title}
          onNext={handleNextClick}
          onPrev={handlePrevClick}
        />

        <div className="block-posts__slider">
          <SlickWithPreventSwipeClick
            ref={setSlickRef}
            {...slickSettings[layout]}
          >
            {postsList}
          </SlickWithPreventSwipeClick>
        </div>
      </div>
    </div>
  );
};

export default PostsSlider;
