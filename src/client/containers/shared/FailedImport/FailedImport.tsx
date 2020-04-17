import React from 'react'
import classNames from 'classnames'

interface Props {
  className?: string
}

const FailedImport = ({ className }: Props) => {
  const classRoot = classNames('failed-import__root', className)

  return <span className={classRoot}>Нет файла</span>
}

export default FailedImport
