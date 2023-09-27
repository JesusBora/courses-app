import './Header.css';
import React from 'react';
import Logo from './components/logo/Logo';
import Button from '../../common/Button/Button';
// import Button from '../../common/Button/Button'

function Header() {
	return (
		<div className='header'>
			<div>
				<Logo></Logo>
				Courses
			</div>
			<div>
				Jesus
				<Button type='submit' text='Logout'></Button>
			</div>
		</div>
	);
}

export default Header;
