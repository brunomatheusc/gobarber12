import React, { FC } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: FC = () => {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={ SignIn } />
					<Route exact path="/sign-up" component={ SignUp } />
					<Route exact path="/dashboard" component={ Dashboard } isPrivate />
				</Switch>
			</BrowserRouter>	
		</>
	);
};

export default Routes;