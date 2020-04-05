import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Fragment from '../../../components/Fragment'
import departmentsAria from '../../../utils/departmentsArea'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './HomeSlider.scss'

const slickSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
}

class HomeSlider extends Component {
  departmentsAreaRef = null;

  media = window.matchMedia('(min-width: 992px)');

  slides = [
    {
      title: '',
      text: '',
      url: '',
      image_classic: '/assets/img/slides/slide-2.jpg',
      image_full: '/assets/img/slides/slide-4.jpg',
      image_mobile: '/assets/img/slides/slide-2-mobile.jpg'
    },
    {
      title: 'Accessories <br> Perfume, costume jewelry',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
      url: '/category/new',
      image_classic: '/assets/img/slides/slide-2.jpg',
      image_full: '/assets/img/slides/slide-2-full.jpg',
      image_mobile: '/assets/img/slides/slide-2-mobile.jpg'
    },
    {
      title: 'One more<br>Unique header',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
      url: '/category/new',
      image_classic: '/assets/img/slides/slide-3.jpg',
      image_full: '/assets/img/slides/slide-3-full.jpg',
      image_mobile: '/assets/img/slides/slide-3-mobile.jpg'
    }
  ];

  componentDidMount () {
    if (this.media.addEventListener) {
      this.media.addEventListener('change', this.onChangeMedia)
    } else {
      this.media.addListener(this.onChangeMedia)
    }
  }

  componentWillUnmount () {
    departmentsAria.area = null

    if (this.media.removeEventListener) {
      this.media.removeEventListener('change', this.onChangeMedia)
    } else {
      this.media.removeListener(this.onChangeMedia)
    }
  }

  onChangeMedia = () => {
    if (this.media.matches) {
      departmentsAria.area = this.departmentsAreaRef
    }
  };

  setDepartmentsAreaRef = (ref) => {
    this.departmentsAreaRef = ref

    if (this.media.matches) {
      departmentsAria.area = this.departmentsAreaRef
    }
  };

  render () {
    const { withDepartments } = this.props

    const blockClasses = classNames(
      'block-slideshow block',
      {
        'block-slideshow--layout--full': !withDepartments,
        'block-slideshow--layout--with-departments': withDepartments
      }
    )

    const layoutClasses = classNames(
      'col-12 colCustom',
      {
        'col-lg-12': !withDepartments,
        'col-lg-9': withDepartments
      }
    )

    const slides = this.slides.map((slide, index) => {
      const image = withDepartments ? slide.image_classic : slide.image_full

      return (
        <div key={index} className='block-slideshow__slide'>
          <div
            className='block-slideshow__slide-image block-slideshow__slide-image--desktop'
            style={{
              backgroundImage: `url(${image})`
            }}
          />
          <div
            className='block-slideshow__slide-image block-slideshow__slide-image--mobile'
            style={{
              backgroundImage: `url(${slide.image_mobile})`
            }}
          />
          <div className='container'>
            <div className='block-slideshow__slide-content'>
              <div
                className='block-slideshow__slide-title'
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <div
                className='block-slideshow__slide-text'
                dangerouslySetInnerHTML={{ __html: slide.text }}
              />
              <Fragment hidden={!slide.url}>
                <div className='block-slideshow__slide-button'>
                  <Link to={slide.url} className='btn btn-primary btn-lg'>Shop Now</Link>
                </div>
              </Fragment>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className={blockClasses}>
        <div className='container-fluid'>
          <div className='row'>
            {withDepartments && (
              <div className='col-3 d-lg-block d-none' ref={this.setDepartmentsAreaRef} />
            )}

            <div className={layoutClasses}>
              <div className='block-slideshow__body'>
                <SlickWithPreventSwipeClick {...slickSettings}>
                  {slides}
                </SlickWithPreventSwipeClick>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HomeSlider.propTypes = {
  withDepartments: PropTypes.bool
}

HomeSlider.defaultProps = {
  withDepartments: false
}

export default HomeSlider