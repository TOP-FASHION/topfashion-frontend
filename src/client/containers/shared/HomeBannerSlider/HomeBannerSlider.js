import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './HomeBannerSlider.scss'

const slickSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
}

class HomeBannerSlider extends Component {
  slides = [
    {
      url: '/category/new',
      image: '/assets/img/new/1.jpg'
    },
    {
      url: '/category/sale',
      image: '/assets/img/new/2.jpg'
    },
    {
      url: '/category/woman',
      image: '/assets/img/new/3.jpg'
    }
  ];

  render () {
    const slides = this.slides.map((slide, index) => {
      return (
        <Link key={index} to={slide.url}>
          <img className='block-homeBannerSlider__slide' src={`${slide.image}`} alt='' />
        </Link>
      )
    })

    return (
      <div className='block-homeBannerSlider block'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='block-homeBannerSlider__body'>
                <h3 className='block-header__title'>Get Inspired</h3>
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

export default HomeBannerSlider
