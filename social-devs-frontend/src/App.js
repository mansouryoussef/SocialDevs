import React, { useContext } from 'react';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Users from './pages/Users/Users';
import User from './pages/User/User';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Post from './pages/Post/Post';
import Footer from './components/Layout/Footer/Footer';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { DataContext } from './contexts/DataContext';
import Spinner from './components/Spinner/Spinner';
import Nav from './components/Layout/Nav/Nav';

const App = ({ location }) => {
	const { isLoggedin, isLoading } = useContext(DataContext);

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

					<Route
						path='/login'
						exact
						render={() => (isLoggedin ? <Redirect to='/feed' /> : <Login />)}
					/>

					<Route
						path='/signup'
						exact
						render={() => (isLoggedin ? <Redirect to='/feed' /> : <Signup />)}
					/>

					<Route path='/users' exact component={Users} />
					<Route path='/user/:user_id' exact component={User} />

					<Route
						path='/profile'
						exact
						render={() =>
							!isLoggedin ? <Redirect to='/login' /> : <Profile />
						}
					/>

					<Route
						path='/feed'
						exact
						render={() => (!isLoggedin ? <Redirect to='/login' /> : <Feed />)}
					/>

					<Route path='/post/:post_id' exact component={Post} />
					{location.pathname !== '/' && <Footer />}
				</main>
			)}
		</>
	);
};

export default App;
