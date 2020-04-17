import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Fragment from '../../../components/Fragment'
import departmentsAria from '../../../utils/departmentsArea'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './HomeSlider.scss'

const slickSettings: any = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
}

interface Props {
  withDepartments?: boolean
}

const HomeSlider = ({ withDepartments = false }: Props) => {
  let departmentsAreaRef: any = null
  const media = window.matchMedia('(min-width: 992px)')
  const slidesSource = [
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
  ]

  React.useEffect(() => {
    if (media.addEventListener) {
      media.addEventListener('change', onChangeMedia)
    } else {
      media.addListener(onChangeMedia)
    }

    return function cleanup () {
      departmentsAria.area = null

      if (media.removeEventListener) {
        media.removeEventListener('change', onChangeMedia)
      } else {
        media.removeListener(onChangeMedia)
      }
    }
  }, [])

  const onChangeMedia = () => {
    if (media.matches) {
      departmentsAria.area = departmentsAreaRef
    }
  }

  const setDepartmentsAreaRef = (ref: any) => {
    departmentsAreaRef = ref

    if (media.matches) {
      departmentsAria.area = departmentsAreaRef
    }
  }

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

  const slides = slidesSource.map((slide: any, index: any) => {
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
            <div className='col-3 d-lg-block d-none' ref={setDepartmentsAreaRef} />
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

export default HomeSlider
