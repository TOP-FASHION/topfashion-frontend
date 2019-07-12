import React, { Fragment } from 'react';
import universal from 'react-universal-component'
import Footer from '../decorators/Footer'
import { Route, Switch, Redirect } from 'react-router'
import { RedirectWithStatus } from '../components/RedirectStatus'


const isProd = process.env.NODE_ENV === 'production';

const UniversalComponent = universal(props => import(`../pages/${props.page}`), {
	ignoreBabelRename: true
});

export default ({ staticContext, lang }) => (
	<Fragment>
		<Switch>
			<Route
				exact
				path="/en"
				render={routeProps => <UniversalComponent page="Home" {...routeProps} />}
			/>
			<Route
				exact
				path="/:lang/about"
				render={routeProps => <UniversalComponent page="About" {...routeProps} />}
			/>
			<RedirectWithStatus status={301} exact from="/" to={`/${lang}`} />
			<Route render={routeProps => <UniversalComponent page="NotFound" {...routeProps} />} />
		</Switch>
		<Footer />
	</Fragment>
);
