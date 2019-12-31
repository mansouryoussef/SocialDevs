import React, { useState } from 'react';
import './SnackbarStyles.scss';

export default function Snackbar({ open }) {
	const [open, setOpen] = useState(false);

	const handleClick = Transition => () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			TransitionComponent={TransitionUp}
			autoHideDuration={100}
			ContentProps={{
				'aria-describedby': 'message-id'
			}}
			message={<span id='message-id'>I love snacks</span>}
		/>
	);
}
