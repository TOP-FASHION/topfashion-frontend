import React, { Component } from 'react'
import departmentsArea from '../../utils/departmentsArea'
import DepartmentsLinks from '../DepartmentsLinks/index'
import './Departments.scss'

class Departments extends Component {
  state = {
    open: false,
    fixed: false,
    area: null
  };

  componentDidMount () {
    document.addEventListener('mousedown', this.handleOutsideClick)

    this.unsubscribeAria = departmentsArea.subscribe((area) => {
      this.setState({
        fixed: !!area,
        area
      })
    })

    this.setState({
      fixed: !!departmentsArea.area,
      area: departmentsArea.area
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { fixed, area, open } = this.state

    if (prevState.fixed !== fixed) {
      const root = this.wrapperRef
      const content = root.querySelector('.departments__links-wrapper')

      if (fixed) {
        const areaRect = area.getBoundingClientRect()
        const areaBottom = areaRect.top + areaRect.height + window.scrollY

        root.classList.remove('departments--transition')
        root.classList.add('departments--fixed', 'departments--opened')

        const height = areaBottom - (content.getBoundingClientRect().top + window.scrollY)

        content.style.height = `${height}px`
        content.getBoundingClientRect() // force reflow
      } else {
        root.classList.remove('departments--opened', 'departments--fixed')
        content.style.height = ''
      }
    } else if (!fixed) {
      if (open) {
        const root = this.wrapperRef

        const content = root.querySelector('.departments__links-wrapper')
        content.getBoundingClientRect() // force reflow
        const startHeight = content.getBoundingClientRect().height

        root.classList.add('departments--transition', 'departments--opened')

        const endHeight = content.getBoundingClientRect().height

        content.style.height = `${startHeight}px`
        content.getBoundingClientRect() // force reflow
        content.style.height = `${endHeight}px`
      } else {
        const root = this.wrapperRef
        const content = root.querySelector('.departments__links-wrapper')
        const startHeight = content.getBoundingClientRect().height

        content.style.height = `${startHeight}px`

        root.classList.add('departments--transition')
        root.classList.remove('departments--opened')

        content.getBoundingClientRect() // force reflow
        content.style.height = ''
      }
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleOutsideClick)

    this.unsubscribeAria()
  }

  unsubscribeAria = () => {};

  setWrapperRef = (node) => {
    this.wrapperRef = node
  };

  handleOutsideClick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(() => ({
        open: false
      }))
    }
  };

  handleButtonClick = () => {
    this.setState(state => ({
      open: !state.open
    }))
  };

  handleTransitionEnd = (event) => {
    if (this.wrapperRef && event.propertyName === 'height') {
      this.wrapperRef.querySelector('.departments__links-wrapper').style.height = ''
      this.wrapperRef.classList.remove('departments--transition')
    }
  };

  render () {
    return (
      <div className='departments' ref={this.setWrapperRef}>
        <div className='departments__body'>
          <div className='departments__links-wrapper' onTransitionEnd={this.handleTransitionEnd}>
            <DepartmentsLinks />
          </div>
        </div>
        <button type='button' className='departments__button' onClick={this.handleButtonClick}>
          <i className='fas fa-bars departments__button-icon' />
          Shop By Category
          <i className='fa fa-angle-up ml-2 opacity-5 departments__button-arrow' />
        </button>
      </div>
    )
  }
}

export default Departments
