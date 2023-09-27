import React from 'react';
import './CourseCard.css';
import data from '../../../../constants.json';
import Button from '../../../../common/Button/Button';
import getCourseCuration from '../../../../helpers/getCourseDuration';

const CourseCard = ({ course }) => {
	const mockedAuthorsList = data.mockedAuthorsList;
	const getAuthorNames = (authorIds) => {
		return authorIds
			.map((authorId) => {
				const author = mockedAuthorsList.find(
					(author) => author.id === authorId
				);
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
					<strong>Autors: </strong>
					{getAuthorNames(course.authors)}
				</p>
				<p>
					<strong>Duration </strong>
					{getCourseCuration(course.duration)}
				</p>
				<Button type='submit' text='Show course'></Button>
			</div>
		</div>
	);
};

export default CourseCard;
