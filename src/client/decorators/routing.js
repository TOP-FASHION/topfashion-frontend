import * as React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export class SetLang extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static childContextTypes = {
    langList: PropTypes.arrayOf(PropTypes.string),
  };

  getChildContext() {
    return {
      langList: this.langList,
    };
  }

  // eslint-disable-next-line @typescript-eslint/camelcase,react/no-typos
  unsafe_componentWillMount() {
    this.langList = this.props.langList;
  }

  render() {
    this.langList = this.props.langList;
    return this.props.children;
  }
}
