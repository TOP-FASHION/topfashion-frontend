import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageHeader from '../../containers/shared/PageHeader'
import BlogPost from '../../containers/shared/BlogPost'

export default function BlogPostPage (props) {
  const { layout } = props

  let content

  if (layout === 'classic') {
    content = (
      <div className='row'>
        <div className='col-12 col-lg-8'>
          <BlogPost layout={layout} />
        </div>
      </div>
    )
  } else if (layout === 'full') {
    content = (
      <div className='row justify-content-center'>
        <div className='col-md-12 col-lg-9 col-xl-8'>
          <BlogPost layout={layout} />
        </div>
      </div>
    )
  }

  const breadcrumbs = [
    { title: 'Home', url: '' },
    { title: 'Blog', url: '' },
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
}

BlogPostPage.propTypes = {
  /**
   * post layout
   * one of ['classic', 'full'] (default: 'classic')
   */
  layout: PropTypes.oneOf(['classic', 'full'])
}

BlogPostPage.defaultProps = {
  layout: 'classic',
  sidebarPosition: 'start'
}
