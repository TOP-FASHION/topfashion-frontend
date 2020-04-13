import * as React from 'react'
import { observer } from 'mobx-react'
// import LoginModal from './LoginModal'
import ProductModal from './ProductModal'
import Fragment from '../../components/Fragment'
import './Modals.scss'

const Modals = observer(() => {
  return (
    <Fragment>
      {/*
      <LoginModal />
      */}
      <ProductModal />
    </Fragment>
  )
})

export default Modals
