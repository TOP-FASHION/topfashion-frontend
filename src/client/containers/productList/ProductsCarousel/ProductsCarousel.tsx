import * as React from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import ProductsBlockHeader from '../ProductsBlockHeader'
import ProductCard from '../../product/ProductCard'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './ProductsCarousel.scss'

const slickSettings: any = {
  'grid-4': {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  'grid-4-sm': {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 474,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  'grid-5': {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1429,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  horizontal: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
}

interface Props {
  title: string,
  layout: 'grid-4' | 'grid-4-sm' | 'grid-5' | 'horizontal',
  rows: number,
  products: any,
  group: string,
  allProducts: boolean,
  withSidebar: boolean,
  loading: boolean,
  onGroupClick: Function
}

const ProductsCarousel = (props: Props) => {
  let {
    title,
    layout = 'grid-4',
    rows = 1,
    products = [],
    allProducts = false,
    withSidebar = false,
    loading = false,
    group
  } = props

  const productsColumns = () => {
    const columns = []

    if (rows > 0) {
      products = products.slice()

      while (products.length > 0) {
        columns.push(products.splice(0, rows))
      }
    }

    return columns
  }

  const columns = (productsColumns().map((column, index) => {
    const products = column.map((product: any) => (
      <div key={product.id} className='block-products-carousel__cell'>
        <ProductCard product={product} />
      </div>
    ))

    return (
      <div key={index} className='block-products-carousel__column'>
        {products}
      </div>
    )
  }))

  const blockClasses = classNames('block block-products-carousel', {
    'block-products-carousel--loading': loading
  })

  const containerClasses = classNames({
    'container-fluid': !withSidebar
  })

  return products ? (
    <div className={blockClasses} data-layout={layout}>
      <div className={containerClasses}>
        <ProductsBlockHeader
          title={title}
          group={group}
        />

        <div className='block-products-carousel__slider'>
          <div className='block-products-carousel__preloader' />
          <SlickWithPreventSwipeClick
            {...slickSettings[layout]}
          >
            {columns}
          </SlickWithPreventSwipeClick>
        </div>
      </div>
    </div>
  ) : null
}

export default injectIntl(ProductsCarousel)
