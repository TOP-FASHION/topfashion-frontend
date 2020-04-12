import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import classNames from 'classnames'

interface Props {
  variant?: 'primary' | 'secondary',
  className?: string,
  disabled?: boolean,
  onClick?: Function,
  children?: React.ReactNode
}

function Button ({ children, variant, className, disabled, onClick }: Props) {
  const [isLoading, setLoading] = React.useState(false)

  const classes = classNames(className, {
    'btn-loading jkhk': isLoading
  })

  React.useEffect(() => {
    if (isLoading) {
      onClick().then(() => {
        setLoading(false)
      })
    }
  }, [isLoading])

  const handleClick = () => setLoading(true)

  return (
    <ReactBootstrap.Button
      className={classes}
      onClick={!isLoading ? handleClick : null}
      disabled={disabled || isLoading}
      variant={variant}
    >
      {children}
    </ReactBootstrap.Button>
  )
}

export default Button
