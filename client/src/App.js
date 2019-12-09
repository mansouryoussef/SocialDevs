import React, { Fragment } from 'react';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Users from './pages/Users/Users';
import User from './pages/User/User';
import { Route } from 'react-router-dom';

const App = ({ match }) => {
	console.log(match.url);
	return (
		<Fragment>
			<Route path='/' exact component={Home} />
			<Route path='/login' exact component={Login} />
			<Route path='/signup' exact component={Signup} />
			<Route path='/users' exact component={Users} />
			<Route path='/user' exact component={User} />
		</Fragment>
	);
};

export default App;
