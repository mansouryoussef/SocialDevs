import React, { useContext, useState } from 'react';
import './ListItemsStyles.scss';
import { useHistory, Link } from 'react-router-dom';

import { DataContext } from '../../../contexts/DataContext';
import Button from '../../Button/Button';
import Burger from '../Burger/Burger';
import { handleSignout } from '../../../service/auth';

import profile from '../../../assets/img/icons/profile.svg';
import profileWhite from '../../../assets/img/icons/profileWhite.svg';
import users from '../../../assets/img/icons/users.svg';
import usersWhite from '../../../assets/img/icons/usersWhite.svg';
import feed from '../../../assets/img/icons/feed.svg';
import feedWhite from '../../../assets/img/icons/feedWhite.svg';
import signout from '../../../assets/img/icons/signout.svg';

export default function ListItems() {
	const [open, setOpen] = useState(false);
	const { isLoggedin, setIsLoggedin } = useContext(DataContext);
	let history = useHistory();

	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<>
			{!isLoggedin ? (
				<ul>
					<li>
						<Button sm highlight text='Sign up' to='/signup' />
					</li>
					<li>
						<Button sm text='Log in' to='/login' />
					</li>
				</ul>
			) : (
				<>
					<Burger setOpen={setOpen} open={open} />
					<div className='listItems-container' id={open && 'active'}>
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
								<Button
									onClick={() => {
										handleSignout(setIsLoggedin, history);
										handleToggle();
									}}
									text='Sign out'
									sm
									icon={signout}
								/>
							</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
}
