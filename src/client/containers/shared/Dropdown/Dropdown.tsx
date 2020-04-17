import React from 'react'
import classNames from 'classnames'
import Menu from '../../header/Menu'
import './Dropdown.scss'

interface Props {
  title?: any,
  items: Array<any>,
  withIcons?: boolean,
  onClick?: Function

}

const Dropdown = ({ withIcons = false, onClick = () => {}, title, items }: Props) => {
  const [open, setOpen] = React.useState(false)
  let wrapperRef: any

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return function cleanup () {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  })

  const setWrapperRef = (node: any) => {
    wrapperRef = node
  }

  const handleOutsideClick = (event: any) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setOpen(false)
    }
  }

  const handleButtonClick = () => {
    setOpen(!open)
  }

  const handleItemClick = (item: any) => {
    setOpen(false)

    if (onClick) {
      onClick(item)
    }
  }

  const classes = classNames('dropdown', {
    'dropdown--opened': open
  })

  return (
    <div className={classes} ref={setWrapperRef}>
      <button className='dropdown__btn' type='button' onClick={handleButtonClick}>
        {title}
        <i className='fa fa-angle-down ml-2 opacity-5' />
      </button>

      <div className='dropdown__body'>
        <Menu
          layout='topbar'
          withIcons={withIcons}
          items={items}
          onClick={handleItemClick}
        />
      </div>
    </div>
  )
}

export default Dropdown
