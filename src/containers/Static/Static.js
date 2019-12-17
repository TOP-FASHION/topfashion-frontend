import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StaticContent from '../StaticContent'
import Loading from '../../components/Loading'
import Fragment from '../../components/Fragment'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'

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
      case 'about':
        return '3'
      case 'contact-us':
        return '4'
      default:
        return page
    }
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
              {<StaticContent className='typography' content={this.props.pageStore.pageContent.content.rendered} />}
            </Fragment>
          )}
        </Fragment>
      </div>
    )
  }
}

export default Static
