import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import { reaction } from 'mobx'
import { Form } from 'react-bootstrap'
import classNames from 'classnames'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import './Search.scss'

@inject('productSearchStore')
@observer
class Search extends Component {
  static propTypes = {
    history: PropTypes.object,
    productSearchStore: PropTypes.any.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    context: PropTypes.string
  }

  componentDidMount () {
    reaction(() => this.props.productSearchStore.productBySearch, async (data) => {
      try {
        if (data.length > 0) {
          this.props.history.push(`/search?name=${this.props.productSearchStore.form.fields.search.value}`)
        } else if (data.length === 0) {
          console.log('ytn')
        }
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
  }

  search = () => {
    this.props.productSearchStore.getProductBySearch()
    return Promise.resolve()
  }

  render () {
    const { onFieldChange, form } = this.props.productSearchStore
    const rootClasses = classNames(`search search--location--${this.props.context}`, this.props.className)

    const closeButton = this.props.context !== 'mobile-header' ? '' : (
      <button
        type='button'
        className='mobile-header__search-button mobile-header__search-button--close'
        onClick={this.props.onClose}
      >
        <i className='fas fa-times' />
      </button>
    )

    return (
      <div className={rootClasses}>
        <Form className='search__form'>
          <Input
            className='search__input'
            autoFocus
            type='text'
            placeholder='Search over 10,000 products'
            onChange={onFieldChange}
            value={form.fields.search.value}
            name='search'
            aria-label='Site search'
            autoComplete='off'
          />
          <Button
            onClick={this.search}
            className={'search__button'}
          >
            <i className='fas fa-search' />
          </Button>
          {closeButton}
          <div className='search__border' />
        </Form>
      </div>
    )
  }
}

export default withRouter(Search)
