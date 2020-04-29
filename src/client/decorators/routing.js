import React from 'react';
import PropTypes from 'prop-types';

export class SetLang extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  static childContextTypes = {
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  getChildContext () {
    return {
      langList: this.langList
    }
  }

  componentWillMount () {
    this.langList = this.props.langList
  }

  render () {
    this.langList = this.props.langList
    return this.props.children
  }
}
