import './Courses.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CreateCourse from '../CreateCourse/CreateCourse';

const Courses = () => {
	const [courses, setCourses] = useState([]); // Initialize courses as an empty array
	const [showCreateCourse, setShowCreateCourse] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the user is authenticated
		const token = localStorage.getItem('token');
		if (!token) {
			// If user is no authenticated
			navigate('/login');
		} else {
			// Fetch courses from the API
			fetch('http://localhost:4000/courses/all')
				.then((response) => response.json())
				.then((data) => setCourses(data.result)) // Use data.result to access the array of courses
				.catch((error) => console.error('Error fetching courses:', error));
		}
	}, [navigate]);

	const addNewCourse = (newCourse) => {
		setCourses([...courses, newCourse]);
		setShowCreateCourse(false);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className='courses'>
			<div className='search-create'>
				<form action=''>
					<Input
						text='Search'
						placeHolder='Search'
						value={searchQuery}
						onChange={handleSearchChange}
					></Input>
					<Button type='submit' text='Search'></Button>
				</form>
				<Button
					type='submit'
					text='Add course'
					id='CreateCourse'
					onClick={() => setShowCreateCourse(true)}
				></Button>
			</div>
			{showCreateCourse ? (
				<CreateCourse onClose={addNewCourse} />
			) : (
				courses
					.filter(
						(course) =>
							course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							course.id.toLowerCase().includes(searchQuery.toLowerCase())
					)
					.map((course) => (
						<CourseCard key={course.id} course={course}></CourseCard>
					))
			)}
		</div>
	);
};

export default Courses;
