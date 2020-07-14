import React, { FC } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: FC = () => {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/sign-in" component={ SignIn } />
					<Route exact path="/sign-up" component={ SignUp } />
				</Switch>
			</BrowserRouter>	
		</>
	);
};

export default Routes;