import * as React from 'react'
import classNames from 'classnames'

interface Props {
  className?: string,
}

function Loading ({ className }:Props) {
  const classes = classNames({
    'app-loading': className
  })

  return (
    <h4 className={classes}>
      Загрузка
    </h4>
  )
}

export default Loading
