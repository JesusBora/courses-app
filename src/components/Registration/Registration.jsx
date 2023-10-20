import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleRegistration = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:4000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData), // Send the formData directly
			});

			if (response.ok) {
				// Registration successful, redirect to the Login page
				navigate('/login');
			} else {
				// Handle registration error, e.g., display an error message
				console.error('Registration failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<h2>Registration</h2>
			<form onSubmit={handleRegistration}>
				<label htmlFor='name'>
					Name
					<input
						type='text'
						name='name'
						placeholder='Name'
						value={formData.name}
						onChange={handleInputChange}
					/>
				</label>
				<label htmlFor='email'>
					Email
					<input
						type='email'
						name='email'
						placeholder='Email'
						value={formData.email}
						onChange={handleInputChange}
					/>
				</label>
				<label htmlFor='password'>
					Password
					<input
						type='password'
						name='password'
						placeholder='Password'
						value={formData.password}
						onChange={handleInputChange}
					/>
				</label>
				<button type='submit'>Register</button>
			</form>
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};

export default Registration;
