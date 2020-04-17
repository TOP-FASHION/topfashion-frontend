import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './ProductGallery.scss'

const slickSettingsFeatured: any = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
}

const slickSettingsThumbnails: any = {
  standard: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    vertical: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4, vertical: false } },
      { breakpoint: 991, settings: { slidesToShow: 3, vertical: false } },
      { breakpoint: 767, settings: { slidesToShow: 5, vertical: false } },
      { breakpoint: 479, settings: { slidesToShow: 4, vertical: false } },
      { breakpoint: 379, settings: { slidesToShow: 3, vertical: false } }
    ]
  },
  sidebar: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    vertical: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4, vertical: false } },
      { breakpoint: 767, settings: { slidesToShow: 5, vertical: false } },
      { breakpoint: 479, settings: { slidesToShow: 4, vertical: false } },
      { breakpoint: 379, settings: { slidesToShow: 3, vertical: false } }
    ]
  },
  columnar: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 5 } },
      { breakpoint: 479, settings: { slidesToShow: 4 } },
      { breakpoint: 379, settings: { slidesToShow: 3 } }
    ]
  },
  quickview: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    vertical: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4, vertical: false } },
      { breakpoint: 767, settings: { slidesToShow: 5, vertical: false } },
      { breakpoint: 479, settings: { slidesToShow: 4, vertical: false } },
      { breakpoint: 379, settings: { slidesToShow: 3, vertical: false } }
    ]
  }
}

interface Props {
  images?: Array<any>,
  layout?: 'standard' | 'sidebar' | 'columnar' | 'quickview'
}

const ProductGallery = ({ images = [], layout = 'standard' }: Props) => {
  let gallery: any
  let createGallery: any = null
  let imagesRefs: any = []
  let unmounted = false
  let slickFeaturedRef: any

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [transition, setTransition] = React.useState(false)

  React.useEffect(() => {
    createGallery = import('./photoswipe').then((module) => module.createGallery)

    return function cleanup () {
      // Код отписки
      if (gallery) {
        gallery.destroy()
      }

      unmounted = true
    }
  }, [])

  const handleFeaturedClick = (event: any, index: any) => {
    if (!createGallery) {
      return
    }

    event.preventDefault()

    const items = images.map(image => ({
      src: image,
      msrc: image,
      w: 600,
      h: 900
    }))

    const options = {
      getThumbBoundsFn: (index: any) => {
        if (!imagesRefs[index]) {
          return null
        }

        const imageElement = imagesRefs[index]
        const pageYScroll =
          window.pageYOffset || document.documentElement.scrollTop
        const rect = imageElement.getBoundingClientRect()

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        }
      },
      index,
      bgOpacity: 0.9,
      history: false
    }

    createGallery.then((createGallery: any) => {
      if (unmounted) {
        return
      }

      gallery = createGallery(items, options)

      gallery.listen('beforeChange', () => {
        if (gallery && slickFeaturedRef) {
          slickFeaturedRef.slickGoTo(gallery.getCurrentIndex(), true)
        }
      })
      gallery.listen('destroy', () => {
        gallery = null
      })

      gallery.init()
    })
  }

  const handleThumbnailClick = (index: any) => {
    if (transition) {
      return
    }

    setCurrentIndex(index)

    if (slickFeaturedRef) {
      slickFeaturedRef.slickGoTo(index)
    }
  }

  const handleFeaturedBeforeChange = (oldIndex: any, newIndex: any) => {
    setCurrentIndex(newIndex)
    setTransition(true)
  }

  const handleFeaturedAfterChange = (index: any) => {
    setCurrentIndex(index)
    setTransition(false)
  }

  const setSlickFeaturedRef = (ref: any) => {
    slickFeaturedRef = ref
  }

  const featured = images.map((image, index) => (
    <Link
      key={index}
      to={`/${image}`}
      onClick={event => handleFeaturedClick(event, index)}
      target='_blank'
    >
      <img
        src={image}
        alt=''
        ref={element => {
          imagesRefs[index] = element
        }}
      />
    </Link>
  ))

  const thumbnails = images.map((image, index) => {
    const classes = classNames('product-gallery__carousel-item', {
      'product-gallery__carousel-item--active': index === currentIndex
    })

    return (
      <button
        type='button'
        key={index}
        onClick={() => handleThumbnailClick(index)}
        className={classes}
      >
        <img className='product-gallery__carousel-image' src={image} alt='' />
      </button>
    )
  })

  return (
    <div className='product__gallery'>
      <div className='product-gallery'>
        <div className='product-gallery__featured'>
          <SlickWithPreventSwipeClick
            ref={setSlickFeaturedRef}
            {...slickSettingsFeatured}
            beforeChange={handleFeaturedBeforeChange}
            afterChange={handleFeaturedAfterChange}
          >
            {featured}
          </SlickWithPreventSwipeClick>
        </div>
        <div className='product-gallery__carousel'>
          <SlickWithPreventSwipeClick {...slickSettingsThumbnails[layout]}>
            {thumbnails}
          </SlickWithPreventSwipeClick>
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
