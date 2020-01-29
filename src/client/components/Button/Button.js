import React, { useEffect, useState } from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Button (props) {
  const { children, variant, className, disabled, onClick } = props
  const [isLoading, setLoading] = useState(false)

  const classes = classNames(className, {
    'btn-loading': isLoading
  })

  useEffect(() => {
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

Button.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
}

Button.defaultProps = {
  variant: '',
  classNames: '',
  disabled: false,
  onClick: () => {}
}

export default Button
