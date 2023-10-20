import './Header.css';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation

import Logo from './components/logo/Logo';

function Header() {
	const location = useLocation(); // Get the current route location
	const navigate = useNavigate();

	// Check if the current route is either '/login' or '/registration'
	const isLoginOrRegistration =
		location.pathname === '/login' || location.pathname === '/registration';

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	const isAuthenticated = !!localStorage.getItem('token');
	const userEmail = isAuthenticated ? localStorage.getItem('userEmail') : '';

	return (
		<div className='header'>
			<div>
				<Logo></Logo>
				Courses
			</div>
			{isAuthenticated && !isLoginOrRegistration && (
				// Show name and logout button only if not on login or registration
				<div>
					{userEmail}
					<button
						type='submit'
						className='logout-button'
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default Header;
