import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import PageHeader from '../PageHeader'
import StaticContent from '../StaticContent'
import Loading from '../../../components/Loading'
import Fragment from '../../../components/Fragment'

@inject('pageStore')
@observer
class Static extends Component {
  static propTypes = {
    pageStore: PropTypes.any,
    page: PropTypes.string
  }

  componentDidMount () {
    const idPage = this.normalizePage(this.props.page)
    this.props.pageStore.getPage(idPage)
  }

  normalizePage (page = '') {
    switch (page) {
      case 'about-us':
        return '2'
      case 'contact-us':
        return '4'
      case 'policy':
        return '3'
      default:
        return page
    }
  }

  get breadcrumb () {
    return [
      { title: 'Home', url: '/' },
      { title: this.props.pageStore.pageContent.title.rendered, url: '' }
    ]
  }

  render () {
    const { page } = this.props
    return (
      <div className={`${page}-page-content`}>
        <Fragment>
          {!this.props.pageStore.pageContent ? (
            <Loading className='static__loading' />
          ) : (
            <Fragment>
              <Helmet title={this.props.pageStore.pageContent.title.rendered} />
              <PageHeader header={this.props.pageStore.pageContent.title.rendered} breadcrumb={this.breadcrumb} />
              {<StaticContent className='typography' content={this.props.pageStore.pageContent.content.rendered} />}
            </Fragment>
          )}
        </Fragment>
      </div>
    )
  }
}

export default Static
