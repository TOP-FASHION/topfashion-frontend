import React from 'react'
import PropTypes from 'prop-types'
import MuiButton from 'material-ui/Button'
import MuiCircularProgress from 'material-ui/Progress/CircularProgress'

class Button extends React.Component {
  static propTypes = {
    classNames: PropTypes.object,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    /** The type of button. */
    type: PropTypes.oneOf(['flat', 'outlined', 'raised', 'fab']),
    /** If true, the ripple effect will be disabled. */
    disableRipple: PropTypes.bool,
    /** other props for the MuiButton component */
    MuiButtonProps: PropTypes.object,
    /** other props for the MuiCircularProgress component */
    MuiCircularProgressProps: PropTypes.object
  }

  static defaultProps = {
    classNames: {},
    disabled: false,
    disableRipple: false,
    loading: false,
    onClick: () => {},
    MuiButtonProps: {},
    MuiCircularProgressProps: {}
  }

  render() {
    const {
      classNames,
      onClick,
      children,
      disabled,
      loading,
      MuiButtonProps,
      MuiCircularProgressProps,
      disableRipple,
      type
    } = this.props

    const {
      spinner: classNameSpinner,
      loading: classNameLoading,
      ...classNamesButton
    } = classNames

    return (
      <MuiButton
        className={loading ? classNameLoading : ''}
        classes={classNamesButton}
        onClick={onClick}
        disabled={disabled || loading}
        disableRipple={disableRipple}
        fab={type === 'fab'}
        {...MuiButtonProps}
      >
        {loading ? (
          <MuiCircularProgress
            size={null}
            className={classNameSpinner}
            {...MuiCircularProgressProps}
          />
        ) : null}
        {children}
      </MuiButton>
    )
  }
}

export default Button
