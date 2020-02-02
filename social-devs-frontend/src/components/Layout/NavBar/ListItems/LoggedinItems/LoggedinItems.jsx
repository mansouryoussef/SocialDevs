import React, { useState, Fragment } from 'react';
import Styles from './LoggedinItems.module.scss';

import Burger from '../../Burger/Burger';
import IconButton from 'components/Shared/Buttons/IconButton/IconButton';
import IconButtonWhite from 'components/Shared/Buttons/IconButtonWhite/IconButtonWhite';
import { Link } from 'react-router-dom';

// import { handleSignout } from 'service/auth';

import profile from 'assets/img/icons/profile.svg';
import profileWhite from 'assets/img/icons/profileWhite.svg';
import users from 'assets/img/icons/users.svg';
import usersWhite from 'assets/img/icons/usersWhite.svg';
import feed from 'assets/img/icons/feed.svg';
import feedWhite from 'assets/img/icons/feedWhite.svg';
import signout from 'assets/img/icons/signout.svg';
import signoutWhite from 'assets/img/icons/signoutWhite.svg';

export default function LoggedinItems({ setIsLoggedin }) {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen(false);
	};

	const handleSignout = () => {
		window.localStorage.removeItem('socialDevsUserToken');

		setIsLoggedin(false);

		window.location.reload();
	};

	return (
		<Fragment>
			<Burger setOpen={setOpen} open={open} />
			<div className={Styles.listItemsContainer} id={open ? Styles.active : ''}>
				<ul>
					<li>
						<Link onClick={handleToggle} className='Link' to='/feed'>
							<img src={open ? feedWhite : feed} alt='Feed icon' />
							<span>Feed</span>
						</Link>
					</li>

					<li>
						<Link onClick={handleToggle} className='Link' to='/users'>
							<img src={open ? usersWhite : users} alt='Users icon' />
							<span>Users</span>
						</Link>
					</li>

					<li>
						<Link onClick={handleToggle} className='Link' to='/profile'>
							<img src={open ? profileWhite : profile} alt='Profile icon' />
							<span>Profile</span>
						</Link>
					</li>

					<li>
						<Link
							onClick={() => {
								handleSignout();
								handleToggle();
							}}
							to='/login'
							className='Link'>
							{open ? (
								<IconButtonWhite icon={signoutWhite} text='Sign out' />
							) : (
								<IconButton icon={signout} text='Sign out' />
							)}
						</Link>
					</li>
				</ul>
			</div>
		</Fragment>
	);
}
