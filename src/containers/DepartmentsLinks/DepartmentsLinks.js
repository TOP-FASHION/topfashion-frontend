import React from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from '../MegaMenu'
import Menu from '../Menu'

// data stubs
import departments from '../../data/headerDepartments'

function DepartmentsLinks () {
  const linksList = departments.map((department, index) => {
    let arrow = null
    let submenu = null
    let itemClass = ''

    if (department.submenu) {
      arrow = <i className='fa fa-angle-right ml-2 opacity-5 departments__link-arrow' />
    }

    if (department.submenu && department.submenu.type === 'menu') {
      itemClass = 'departments__item--menu'
      submenu = (
        <div className='departments__menu'>
          <Menu items={department.submenu.menu} />
        </div>
      )
    }

    if (department.submenu && department.submenu.type === 'megamenu') {
      submenu = (
        <div className={`departments__megamenu departments__megamenu--${department.submenu.menu.size}`}>
          <MegaMenu menu={department.submenu.menu} location='department' />
        </div>
      )
    }

    return (
      <li key={index} className={`departments__item ${itemClass}`}>
        <Link to={department.url}>
          {department.title}
          {arrow}
        </Link>
        {submenu}
      </li>
    )
  })

  return (
    <ul className='departments__links'>
      {linksList}
    </ul>
  )
}

export default DepartmentsLinks
