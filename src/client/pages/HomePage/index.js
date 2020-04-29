/*
 * Due to this known issue: https://github.com/smooth-code/loadable-components/issues/173
 * Use .js extension for code-splitting file
 */

import React from 'react';
import loadable from '@loadable/component';
import Loading from '../../components/Loading';
import ErrorBoundary from '../../components/ErrorBoundary';

const HomePage = loadable(() => import('./HomePage'), {
  fallback: <Loading />,
});

export default (props) => (
  <ErrorBoundary>
    <HomePage {...props} />
  </ErrorBoundary>
);
