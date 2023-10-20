import React from 'react';
import { useLocation } from 'react-router-dom';

const CourseInfo = () => {
	// Get the course information from the location state
	const location = useLocation();
	const course = location.state.course;

	return (
		<div>
			<h2>Course Information</h2>
			<p>
				<strong>Title:</strong> {course.title}
			</p>
			<p>
				<strong>Description:</strong> {course.description}
			</p>
			<p>
				<strong>Creation Date:</strong> {course.creationDate}
			</p>
			<p>
				<strong>Duration:</strong> {course.duration}
			</p>
			<p>
				<strong>Authors:</strong> {course.authors.join(', ')}
			</p>
			<p>
				<strong>ID:</strong> {course.id}
			</p>
		</div>
	);
};

export default CourseInfo;
