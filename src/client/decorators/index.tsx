import * as React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { SetLang } from './routing';
import MainDecorator from './MainDecorator';
import EmptyDecorator from './EmptyDecorator';
import Modals from '../containers/modals';
import Notifications from '../containers/notifications';
import Fragment from '../components/Fragment';
import searchParse from '../utils/text/url/searchParse';
import sessionTabStorage from '../utils/sessionTabStorage';

@observer
class AppRoot extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    history: PropTypes.shape({
      listen: PropTypes.func,
      replace: PropTypes.func,
    }),
  };

  static childContextTypes = {
    url: PropTypes.shape({
      history: PropTypes.arrayOf(PropTypes.string),
      position: PropTypes.number,
      save: PropTypes.func,
    }),
  };

  url = JSON.parse(
    sessionTabStorage.get('url') || '{"history": [], "position": -1}'
  );

  getChildContext() {
    return {
      url: {
        ...this.url,
        save: this.save,
      },
    };
  }

  save = (state = this.url) =>
    sessionTabStorage.set('url', JSON.stringify(state));

  componentDidMount() {
    const pushState = history.pushState.bind(history);
    if (!this.url.history.length) {
      this.url.history.push(location.pathname + location.search);
      this.url.position = 0;
    }
    history.pushState = (...a) => {
      this.push(/^(https?:\/\/[^/]*)?(.*)/.exec(a[2])[2]);
      return pushState(...a);
    };
    window.addEventListener('popstate', () => {
      const url = location.pathname + location.search;
      const isBack = this.url.history[this.url.position - 1] === url;
      const search = searchParse(location.search);
      if (isBack) {
        this.url.position--;
      } else {
        this.url.position++;
        this.url.history.length = this.url.position + 1;
      }
      this.save();
      if (
        isBack &&
        search.modal &&
        this.url.history[this.url.position + 1] === url
      ) {
        const closeButton = document.querySelector(
          '.modal-buttonRoot'
        ) as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    });
    if (
      location.pathname + location.search !==
      this.url.history[this.url.position]
    ) {
      this.push(location.pathname + location.search);
    }
  }

  push(url: any) {
    this.url.position++;
    if (this.url.position === this.url.history.length) {
      this.url.history.push(url);
    } else if (this.url.position < this.url.history.length) {
      this.url.history.length = this.url.position;
      this.url.history.push(url);
    } else {
      console.error('url position is not stable');
    }
    this.save();
  }

  render() {
    return (
      <Fragment>
        <SetLang langList={['en', 'ru']}>
          <Notifications />
          <Modals />
          <Switch>
            <Route path="/blocked" component={EmptyDecorator} exact />
            <Route component={MainDecorator} />
          </Switch>
        </SetLang>
      </Fragment>
    );
  }
}

export default hot(module)(AppRoot);
