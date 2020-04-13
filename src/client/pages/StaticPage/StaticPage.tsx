import * as React from 'react'
import Fragment from '../../components/Fragment'
import Static from '../../containers/shared/Static'

interface Props {
  page: any
}

const StaticPage = ({ page }: Props) => {
  return (
    <Fragment>
      <div id='static-page__anchor' />
      <div className='static-page__container container'>
        <div className='static-page__menu'>
          <div className='static-page-menu'>
            {/* <AsideMenuItems id='menuAsideStatic' scrollTo='#static-page__anchor' className='static-page-menu__item' /> */}
          </div>
        </div>
        <div className='static-page__content'>
          <Static page={page} />
        </div>
      </div>
    </Fragment>
  )
}

export default StaticPage
