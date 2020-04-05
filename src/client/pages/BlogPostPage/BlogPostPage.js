import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { inject, observer } from 'mobx-react'
import { reaction } from 'mobx'
import PageHeader from '../../containers/shared/PageHeader'
import BlogPost from '../../containers/promotions/BlogPost'

@inject('postStore')
@observer
class BlogPostPage extends Component {
  static propTypes = {
    postStore: PropTypes.any,
    match: PropTypes.shape({
      params: PropTypes.shape({
        postId: PropTypes.string
      })
    })
  }

  componentDidMount () {
    reaction(() => this.props.match.params.postId, async () => {
      try {
        this.props.postStore.getPost(this.props.match.params.postId)
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
  }

  get post () {
    return this.props.postStore.postContent
  }

  render () {
    const { layout } = this.props
    let content

    if (this.post) {
      if (layout === 'classic') {
        content = (
          <div className='row'>
            <div className='col-12 col-lg-8'>
              <BlogPost layout={layout} content={this.post} />
            </div>
          </div>
        )
      } else if (layout === 'full') {
        content = (
          <div className='row justify-content-center'>
            <div className='col-md-12 col-lg-9 col-xl-8'>
              <BlogPost layout={layout} content={this.post} />
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
  }
}

export default BlogPostPage

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
