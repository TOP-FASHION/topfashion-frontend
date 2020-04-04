import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { observer, inject } from 'mobx-react'
import PageHeader from '../../containers/shared/PageHeader'
import Pagination from '../../containers/shared/Pagination'
import PostCard from '../../components/PostCard'
import './BlogCategoryPage.scss'

@inject('postStore')
@observer
class BlogCategoryPage extends Component {
  static propTypes = {
    postStore: PropTypes.any,
    layout: PropTypes.oneOf(['classic', 'grid', 'list'])
  }

  static defaultProps = {
    layout: 'classic',
    sidebarPosition: 'start'
  }

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

  get totalPage () {
    return parseFloat(this.props.postStore.pagesPosts)
  }

  render () {
    const { layout } = this.props
    const { page } = this.state

    const breadcrumb = [
      { title: 'Home', url: '/' },
      { title: 'Promotions', url: '' }
    ]

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
                      total={this.totalPage}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BlogCategoryPage
