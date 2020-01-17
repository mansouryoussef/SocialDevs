import React, { useContext } from 'react';

import { DataContext } from 'contexts/DataContext';

import { Link } from 'react-router-dom';
import Button from 'components/Shared/Buttons/Button/Button';
import LoggedinItems from './LoggedinItems/LoggedinItems';

const NotLoggedinItems = () => (
	<ul>
		<li>
			<Link to='/signup' className='Link'>
				<Button filled text='Sign up' />
			</Link>
		</li>
		<li>
			<Link to='/login' className='Link'>
				<Button text='Log in' />
			</Link>
		</li>
	</ul>
);

export default function ListItems() {
	const { isLoggedin, setIsLoggedin } = useContext(DataContext);

	return isLoggedin ? (
		<LoggedinItems setIsLoggedin={setIsLoggedin} />
	) : (
		<NotLoggedinItems />
	);
}
