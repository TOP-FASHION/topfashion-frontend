import React from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes';
import ScrollToTop from '../components/ScrollToTop'

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <Router>
        <ScrollToTop>
          <Routes />
        </ScrollToTop>
      </Router>
    );
  }
}

export default hot(AppRoot)
