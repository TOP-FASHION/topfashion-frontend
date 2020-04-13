import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import { Form } from 'react-bootstrap'
import classNames from 'classnames'
import { AppContext } from '../../../core/Store/context'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import './Search.scss'

interface MatchParams {
  history: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  onClose?: ({}) => void | Function,
  className?: string,
  context?: string
}

const Search = observer(({ onClose = () => {}, className, context, ...otherProps }: Props) => {
  const { productSearchStore } = React.useContext(AppContext)

  React.useEffect(() => {
    reaction(
      () => productSearchStore.productBySearch,
      data => {
        if (data) {
          otherProps.history.push(`/search?name=${productSearchStore.form.fields.search.value}`)
        }
      },
      { fireImmediately: true }
    )
  }, [])

  const search = () => {
    productSearchStore.getProductBySearch()
    return Promise.resolve()
  }

  const { onFieldChange, form } = productSearchStore
  const rootClasses = classNames(`search search--location--${context}`, className)

  const closeButton = context !== 'mobile-header' ? '' : (
    <button
      type='button'
      className='mobile-header__search-button mobile-header__search-button--close'
      onClick={onClose}
    >
      <i className='fas fa-times' />
    </button>
  )

  return (
    <div className={rootClasses}>
      <Form className='search__form'>
        <Input
          className='search__input'
          type='text'
          placeholder='Search over 10,000 products'
          onChange={onFieldChange}
          value={form.fields.search.value}
          name='search'
          aria-label='Site search'
        />
        <Button
          onClick={search}
          className={'search__button'}
        >
          <i className='fas fa-search' />
        </Button>
        {closeButton}
        <div className='search__border' />
      </Form>
    </div>
  )
})

export default withRouter(Search)
