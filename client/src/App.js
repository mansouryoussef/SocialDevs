import React, { Fragment } from 'react';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { Route } from 'react-router-dom';

const App = () => (
	<Fragment>
		<Route path='/' exact component={Home} />
		<Route path='/login' exact component={Login} />
		<Route path='/signup' exact component={Signup} />
	</Fragment>
);

export default App;
