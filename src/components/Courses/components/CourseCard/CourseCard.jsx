import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import getCourseDuration from '../../../../helpers/getCourseDuration';

const CourseCard = ({ course }) => {
	const [authors, setAuthors] = useState([]); // Initialize authors as an empty array

	useEffect(() => {
		// Fetch authors from the API
		fetch('http://localhost:4000/authors/all')
			.then((response) => response.json())
			.then((data) => setAuthors(data.result)) // Use data.result to access the array of authors
			.catch((error) => console.error('Error fetching authors:', error));
	}, []);

	const getAuthorNames = (authorIds) => {
		return authorIds
			.map((authorId) => {
				const author = authors.find((author) => author.id === authorId);
				return author ? author.name : '';
			})
			.join(', ');
	};

	return (
		<div className='course-card'>
			<div className='title-desc'>
				<h2>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className='details'>
				<p>
					<strong>Authors: </strong>
					{authors.length > 0 ? getAuthorNames(course.authors) : 'No Authors'}
				</p>
				<p>
					<strong>Duration: </strong>
					{getCourseDuration(course.duration)}
				</p>
				<Link to={`/courses/${course.id}`}>
					{' '}
					{/* Link to the specific course */}
					<Button type='submit' text='Show course' />
				</Link>
			</div>
		</div>
	);
};

export default CourseCard;
