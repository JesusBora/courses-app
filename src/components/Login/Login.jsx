import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	// State to store user credentials
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	// Function to handle changes in input fields
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Function to handle the login process
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Send a POST request to the login API endpoint
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData), // Send the formData directly
			});

			if (response.ok) {
				// Login successful - store the token in localStorage
				const data = await response.json();
				localStorage.setItem('token', data.token);
				localStorage.setItem('userEmail', formData.email);

				// Redirect to protected route
				navigate('/courses');
			} else {
				// Handle login error, e.g., display an error message
				console.error('Login failed');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleInputChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleInputChange}
				/>
				<button type='submit'>Login</button>
			</form>
			<p>
				Don't have an account? <Link to='/registration'>Register</Link>
			</p>
		</div>
	);
};

export default Login;
