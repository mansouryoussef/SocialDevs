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
import Footer from './components/Footer/Footer';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import { Redirect } from 'react-router-dom';
import { DataContext } from './contexts/DataContext';
import Spinner from './components/Spinner/Spinner';

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
					<Route path='/login' exact component={Login} />
					<Route path='/signup' exact component={Signup} />
					<Route path='/users' exact component={Users} />
					<Route path='/user/:user_id' exact component={User} />
					<Route path='/profile' exact component={Profile} />
					<Route path='/feed' exact component={Feed} />
					<Route path='/post/:post_id' exact component={Post} />
					{location.pathname !== '/' && <Footer />}
				</main>
			)}
		</>
	);
};

export default App;
