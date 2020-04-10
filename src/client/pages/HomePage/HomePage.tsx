import * as React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
// @ts-ignore
import { injectIntl } from 'react-intl'
import { AppContext } from '../../core/Store/context'
import HomeSlider from '../../containers/home/HomeSlider'
import BannerFeatures from '../../containers/home/BannerFeatures'
import ProductsCarouselTabbs from '../../containers/productList/ProductsCarouselTabbs'
import HomeBanner from '../../containers/home/HomeBanner'
import HomeBannerSlider from '../../containers/home/HomeBannerSlider'
import PostsSlider from '../../containers/promotions/PostsSlider'
import AboutCompany from '../../containers/home/AboutCompany'
import setMessages from '../../utils/setMessages'
import messages from './Home.messages'
import normalizeCategory from '../../utils/normalizeCategory'
import './HomePage.scss'

const HomePage = observer((props: any) => {
  const { productsStore, postStore } = React.useContext(AppContext)
  const [productsBestsellers, setProductsBestsellers] = React.useState([])
  const message = setMessages(props, messages, 'app.page.home.')

  React.useEffect(() => {
    const getBestsellers = async () => {
      const itemsBestsellers = await productsStore.getProducts({
        page: 1,
        per_page: productsStore.countProducts,
        'filter[limit]': productsStore.countProducts,
        category: normalizeCategory('bestsellers')
      })
      setProductsBestsellers(itemsBestsellers)
    }
    getBestsellers()
  }, [])

  React.useEffect(() => {
    postStore.getPosts()
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Top Fashion`}</title>
      </Helmet>
      <HomeSlider />
      <HomeBannerSlider />
      <HomeBanner />
      {productsBestsellers
        ? <ProductsCarouselTabbs
          title={message('bestsellers')}
          products={productsBestsellers}
          group='bestsellers'
          allProducts
          key='bestsellers'
          layout='grid-5'
        /> : null
      }
      <BannerFeatures layout='boxed' />
      {postStore.posts
        ? <PostsSlider
          title='Latest News'
          layout='grid-nl'
          posts={postStore.posts}
        /> : null
      }
      <AboutCompany />
    </React.Fragment>
  )
})

export default injectIntl(HomePage)
