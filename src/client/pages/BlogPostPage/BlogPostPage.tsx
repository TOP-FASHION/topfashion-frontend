import * as React from 'react'
// import { RouteComponentProps } from 'react-router'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import { AppContext } from '../../core/Store/context'
import PageHeader from '../../containers/shared/PageHeader'
import BlogPost from '../../containers/promotions/BlogPost'

interface Props {
  layout?: 'classic' | 'full',
  match: any
}

const BlogPostPage = observer(({ layout = 'classic', match }: Props) => {
  const { postStore } = React.useContext(AppContext)

  React.useEffect(() => {
    reaction(() => match.params.postId, async () => {
      try {
        postStore.getPost(match.params.postId)
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
  }, [])

  const post = postStore.postContent
  let content

  if (post) {
    if (layout === 'classic') {
      content = (
        <div className='row'>
          <div className='col-12 col-lg-8'>
            <BlogPost layout={layout} content={post} />
          </div>
        </div>
      )
    } else if (layout === 'full') {
      content = (
        <div className='row justify-content-center'>
          <div className='col-md-12 col-lg-9 col-xl-8'>
            <BlogPost layout={layout} content={post} />
          </div>
        </div>
      )
    }
  }

  const breadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Promotions', url: '/promotions-news' },
    { title: 'Latest News', url: '' }
  ]

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Blog Post Page — `}</title>
      </Helmet>
      <PageHeader header='Post' breadcrumb={breadcrumbs} />
      <div className='container'>{content}</div>
    </React.Fragment>
  )
})

export default BlogPostPage
