// Courses.jsx
import React, { useState } from 'react';
import './Courses.css';
import data from '../../constants.json';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CreateCourse from '../CreateCourse/CreateCourse';

const Courses = () => {
	const mockedCoursesList = data.mockedCoursesList;
	const [showCreateCourse, setShowCreateCourse] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const addNewCourse = (newCourse) => {
		// Update the mockedCoursesList with the new course
		data.mockedCoursesList.push(newCourse);
		// Close the CreateCourse component
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
				mockedCoursesList
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
