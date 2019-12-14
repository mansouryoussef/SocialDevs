import React from 'react';
import './NavStyles.scss';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import profile from '../../assets/img/icons/profile.svg';
import users from '../../assets/img/icons/users.svg';
import feed from '../../assets/img/icons/feed.svg';
import signout from '../../assets/img/icons/signout.svg';
import { Link } from 'react-router-dom';

export default function Nav({ loggedin }) {
	const signBtns = (
		<>
			<div className='nav-container__btns'>
				<Button sm highlight text='Sign up' to='/signup' />
				<Button sm text='Log in' to='/login' />
			</div>
		</>
	);
	const loggedinItems = (
		<div className='nav-container__items'>
			<Link className='Link' to='/feed'>
				<span className='nav-container__items__item'>
					<img src={feed} alt='Feed icon' />
					<span>Feed</span>
				</span>
			</Link>
			<Link className='Link' to='/users'>
				<span className='nav-container__items__item'>
					<img src={users} alt='Users icon' />
					<span>Users</span>
				</span>
			</Link>
			<Link className='Link' to='/profile'>
				<span className='nav-container__items__item'>
					<img src={profile} alt='Profile icon' />
					<span>Profile</span>
				</span>
			</Link>
			<Button text='Sign out' sm icon={signout} />
		</div>
	);

	return (
		<div className='nav-container'>
			<Logo />
			{!loggedin ? signBtns : loggedinItems}
		</div>
	);
}
