import React, { Fragment } from 'react'
import universal from 'react-universal-component'
import { Route, Switch } from 'react-router'
import Footer from './Footer'
import { RedirectWithStatus } from '../components/RedirectStatus'
import GoogleTagManager from '../components/GoogleTagManager'
import Spinner from '../components/Spinner'

const isProd = process.env.NODE_ENV === 'production';

const UniversalComponent = universal(props => import(`../pages/${props.page}`), {
  loading: () => <Spinner />,
	ignoreBabelRename: true
});

export default ({ staticContext, lang }) => (
	<Fragment>
    {isProd ? <GoogleTagManager gtmId='GTM-WFTXGC8' /> : ''}
		<Switch>
			<Route
				exact
				path='/'
				render={routeProps => <UniversalComponent page='Home' {...routeProps} />}
			/>
			<Route
				exact
				path='/:lang/about'
				render={routeProps => <UniversalComponent page='About' {...routeProps} />}
			/>
			<RedirectWithStatus status={301} exact from='/' to={`/${lang}`} />
			<Route render={routeProps => <UniversalComponent page="NotFound" {...routeProps} />} />
		</Switch>
		<Footer />
	</Fragment>
);
