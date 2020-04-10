import * as React from 'react'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react'
import { AppContext } from '../../core/Store/context'
import PageHeader from '../../containers/shared/PageHeader'
import Pagination from '../../components/Pagination'
import PostCard from '../../containers/promotions/PostCard'
import './BlogCategoryPage.scss'

interface Props {
  layout?: 'classic' | 'grid' | 'list'
}

const BlogCategoryPage = observer(({ layout = 'classic' }: Props) => {
console.log('dsfsd')
  const { postStore } = React.useContext(AppContext)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    postStore.getPosts()
  }, [])

  const handlePageChange = (page: any) => {
    setPage(page)
  }

  const totalPage = parseFloat(postStore.pagesPosts)

  const breadcrumb = [
    { title: 'Home', url: '/' },
    { title: 'Promotions', url: '' }
  ]

  const postsList = postStore.posts ? postStore.posts.map((post: any) => {
    const postLayout = {
      classic: 'grid-lg',
      grid: 'grid-nl',
      list: 'list-nl'
    }[layout]

    return (
      <div key={post.id} className='posts-list__item'>
        <PostCard post={post} layout={postLayout} />
      </div>
    )
  }) : 'Закгрузка'

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Blog Category Page `}</title>
      </Helmet>

      <PageHeader header='Latest News' breadcrumb={breadcrumb} />

      <div className='container'>
        <div className='row'>
          <div className='col-12 col-lg-12'>
            <div className='block'>
              <div className='posts-view'>
                <div className={`posts-view__list posts-list posts-list--layout--${layout}`}>
                  <div className='posts-list__body'>
                    {postsList}
                  </div>
                </div>
                <div className='posts-view__pagination'>
                  <Pagination
                    current={page}
                    siblings={2}
                    total={totalPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
})

export default BlogCategoryPage
