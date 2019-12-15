import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { observer, inject } from 'mobx-react'
import PageHeader from '../../containers/PageHeader'
import Pagination from '../../containers/Pagination'
import PostCard from '../../components/PostCard'
// import BlogSidebar from './BlogSidebar'

// data stubs
// import posts from '../../data/blogPosts'
import './BlogCategoryPage.scss'

@inject('postStore')
@observer
class BlogCategoryPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 1
    }
  }

  componentDidMount () {
    this.props.postStore.getPosts()
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }))
  };

  render () {
    const { layout, sidebarPosition } = this.props
    const { page } = this.state

    const breadcrumb = [
      { title: 'Home', url: '' },
      { title: 'Blog', url: '' },
      { title: 'Latest News', url: '' }
    ]

    let sidebarStart
    let sidebarEnd

    // const sidebar = <BlogSidebar position={sidebarPosition} />;

    if (sidebarPosition === 'start') {
      // sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
    } else if (sidebarPosition === 'end') {
      // sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
    }

    const postsList = this.props.postStore.posts ? this.props.postStore.posts.map((post) => {
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
          <title>{`Blog Category Page — Stroyka`}</title>
        </Helmet>

        <PageHeader header='Latest News' breadcrumb={breadcrumb} />

        <div className='container'>
          <div className='row'>
            {/* {sidebarStart} */}
            <div className='col-12 col-lg-8'>
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
                      total={10}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {sidebarEnd}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BlogCategoryPage

BlogCategoryPage.propTypes = {
  /**
   * blog layout
   * one of ['classic', 'grid', 'list'] (default: 'classic')
   */
  layout: PropTypes.oneOf(['classic', 'grid', 'list']),
  /**
   * sidebar position (default: 'start')
   * one of ['start', 'end']
   * for LTR scripts "start" is "left" and "end" is "right"
   */
  sidebarPosition: PropTypes.oneOf(['start', 'end'])
}

BlogCategoryPage.defaultProps = {
  layout: 'classic',
  sidebarPosition: 'start'
}
