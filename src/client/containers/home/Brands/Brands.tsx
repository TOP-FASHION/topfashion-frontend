import React from 'react'
import { Link } from 'react-router-dom'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './Brands.scss'

const brands = [
  { image: '/assets/img/logos/logo-1.svg' },
  { image: '/assets/img/logos/logo-2.svg' },
  { image: '/assets/img/logos/logo-3.svg' },
  { image: '/assets/img/logos/logo-4.svg' },
  { image: '/assets/img/logos/logo-5.svg' },
  { image: '/assets/img/logos/logo-6.svg' },
  { image: '/assets/img/logos/logo-7.svg' }
]

const slickSettings: any = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
}

export default function BlockBrands () {
  const brandsList = brands.map((brand, index) => (
    <div key={index} className='block-brands__item'>
      <Link to='/'><img src={brand.image} alt='' /></Link>
    </div>
  ))

  return (
    <div className='block block-brands'>
      <div className='container-fluid'>
        <div className='block-brands__slider'>
          <SlickWithPreventSwipeClick {...slickSettings}>
            {brandsList}
          </SlickWithPreventSwipeClick>
        </div>
      </div>
    </div>
  )
}
