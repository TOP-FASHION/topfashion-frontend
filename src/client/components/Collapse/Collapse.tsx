import * as React from 'react'

interface Props {
  toggleClass?: string,
  render?: Function,
  open?: boolean,
}

function Collapse ({ toggleClass, render, open }: Props) {
  let content: any
  let item: any

  React.useEffect(() => {
    if (!content) {
      return
    }

    content.addEventListener('transitionend', handleTransitionEnd)

    if (open === true) {
      expand(true)
    }
    if (open === false) {
      collapse(true)
    }

    return function cleanup () {
      // Код отписки
      if (!content) {
        return
      }

      content.removeEventListener('transitionend', handleTransitionEnd)
    }
  })

  const handleTransitionEnd = (event: any) => {
    if (content && event.propertyName === 'height') {
      content.style.height = ''
    }
  }

  const handleToggle = () => {
    if (!item || !content || !toggleClass) {
      return
    }

    if (item.classList.contains(toggleClass)) {
      collapse()
    } else {
      expand()
    }
  }

  const setItemRef = (ref: any) => {
    item = ref
  }

  const setContentRef = (ref: any) => {
    content = ref
  }

  const expand = (immediate = false) => {
    if (!item || !content || !toggleClass) {
      return
    }

    if (immediate) {
      item.classList.add(toggleClass)
      content.style.height = ''
    } else {
      const startHeight = content.getBoundingClientRect().height

      item.classList.add(toggleClass)

      const endHeight = content.getBoundingClientRect().height

      content.style.height = `${startHeight}px`
      content.getBoundingClientRect() // force reflow
      content.style.height = `${endHeight}px`
    }
  }

  const collapse = (immediate = false) => {
    if (immediate) {
      item.classList.remove(toggleClass)
      content.style.height = ''
    } else {
      const startHeight = content.getBoundingClientRect().height

      content.style.height = `${startHeight}px`
      item.classList.remove(toggleClass)

      content.getBoundingClientRect() // force reflow
      content.style.height = ''
    }
  }

  if (render) {
    return render({
      toggle: handleToggle,
      setItemRef: setItemRef,
      setContentRef: setContentRef
    })
  }

  return null
}

export default Collapse
