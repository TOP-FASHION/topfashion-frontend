import React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import PropTypes from 'prop-types'
import classNames from "classnames"

function Button(props) {
  const { children, variant, className, disabled, loading, onClick } = props;

  const classes = classNames(className, {
    'btn-loading': loading
  })

  return (
    <ReactBootstrap.Button
      className={classes}
      onClick={!loading ? onClick : null}
      disabled={disabled || loading}
      variant={variant}
    >
      {children}
    </ReactBootstrap.Button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: '',
  classNames: '',
  disabled: false,
  loading: false,
  onClick: () => {}
};

export default Button
