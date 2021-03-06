import React, { useContext } from 'react';
import './App.scss';

import { Redirect, Route } from 'react-router-dom';

import PrivateRoute from './components/Shared/PrivateRoute/PrivateRoute';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Users from 'pages/Users/Users';
import User from 'pages/User/User';
import Feed from 'pages/Feed/Feed';
import Profile from 'pages/Profile/Profile';
import Post from 'pages/Post/Post';
import Footer from 'components/Layout/Footer/Footer';
import Spinner from 'components/Shared/Spinner/Spinner';
import Nav from 'components/Layout/NavBar/Nav/Nav';
import { AuthContext } from './contexts/AuthContext';
import { LoadingContext } from './contexts/LoadingContext';
import PublicRoute from './components/Shared/PublicRoute/PublicRoute';

const App = ({ location }) => {
	const { isLoggedin } = useContext(AuthContext);
	const { isLoading } = useContext(LoadingContext);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<main className='app-container'>
					{location.pathname !== '/' && <Nav />}

					<Route
						path='/'
						exact
						render={() => (isLoggedin ? <Redirect to='/feed' /> : <Home />)}
					/>

					<Route path='/users' exact component={Users} />
					<Route path='/user/:user_id' exact component={User} />

					<PublicRoute path='/login' component={Login} />
					<PublicRoute path='/signup' component={Signup} />
					<PrivateRoute path='/feed' component={Feed} />
					<PrivateRoute path='/profile' component={Profile} />
					<PrivateRoute path='/post/:post_id' component={Post} />

					{location.pathname !== '/' && <Footer />}
				</main>
			)}
		</>
	);
};

export default App;
