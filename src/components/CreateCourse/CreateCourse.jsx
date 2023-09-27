import React, { useState } from 'react';
import data from '../../constants.json';

const CreateCourse = ({ onClose }) => {
	const [courseData, setCourseData] = useState({
		title: '',
		description: '',
		authors: [],
		duration: '',
	});

	const [newAuthor, setNewAuthor] = useState('');

	const [alertMessage, setAlertMessage] = useState('');

	const mockedAuthorsList = data.mockedAuthorsList;

	const handleTitleChange = (e) => {
		setCourseData({ ...courseData, title: e.target.value });
	};

	const handleDescriptionChange = (e) => {
		setCourseData({ ...courseData, description: e.target.value });
	};

	const handleDurationChange = (e) => {
		setCourseData({ ...courseData, duration: e.target.value });
	};

	const handleAuthorChange = (e) => {
		setNewAuthor(e.target.value);
	};

	const handleAddAuthor = (authorId) => {
		const author = mockedAuthorsList.find((a) => a.id === authorId);
		if (author) {
			setCourseData({
				...courseData,
				authors: [...courseData.authors, authorId],
			});
		}
	};

	const handleDeleteAuthor = (authorId) => {
		const updatedAuthors = courseData.authors.filter((id) => id !== authorId);
		setCourseData({ ...courseData, authors: updatedAuthors });
	};

	const handleCreateAuthor = () => {
		if (newAuthor.length >= 2) {
			// Generate a unique author ID
			const newAuthorId = `author-${Date.now()}`;
			const newAuthorObj = { id: newAuthorId, name: newAuthor };
			// Update mockedAuthorsList and set it back to data.mockedAuthorsList
			data.mockedAuthorsList.push(newAuthorObj);
			// Clear the input field
			setNewAuthor('');
		} else {
			setAlertMessage('Author name must be at least 2 characters');
		}
	};

	const handleCreateCourse = () => {
		if (validateForm()) {
			// Generate a unique course ID
			const newCourseId = `course-${Date.now()}`;
			const currentDate = new Date().toLocaleDateString('en-GB');
			const newCourse = {
				id: newCourseId,
				title: courseData.title,
				description: courseData.description,
				creationDate: currentDate,
				duration: courseData.duration,
				authors: courseData.authors,
			};
			// Call the onClose callback to add the new course and close the component
			onClose(newCourse);
		} else {
			setAlertMessage('All fields are required');
		}
	};

	const validateForm = () => {
		return (
			courseData.title.length >= 2 &&
			courseData.description.length >= 2 &&
			courseData.authors.length > 0 &&
			courseData.duration > 0
		);
	};

	return (
		<div className='create-course'>
			<h2>Create New Course</h2>
			{alertMessage && <div className='alert'>{alertMessage}</div>}
			<input
				type='text'
				placeholder='Title'
				value={courseData.title}
				onChange={handleTitleChange}
			/>
			<textarea
				placeholder='Description'
				value={courseData.description}
				onChange={handleDescriptionChange}
			/>
			<div className='author-section'>
				<h4>Authors:</h4>
				<ul>
					{mockedAuthorsList.map((author) => (
						<li key={author.id}>
							{author.name}
							<button onClick={() => handleAddAuthor(author.id)}>
								Add author
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className='selected-authors'>
				<h4>Course Authors:</h4>
				<ul>
					{courseData.authors.map((authorId) => (
						<li key={authorId}>
							{mockedAuthorsList.find((author) => author.id === authorId)?.name}
							<button onClick={() => handleDeleteAuthor(authorId)}>
								Delete author
							</button>
						</li>
					))}
				</ul>
			</div>
			<input
				type='text'
				placeholder='Author name'
				value={newAuthor}
				onChange={handleAuthorChange}
			/>
			<button onClick={handleCreateAuthor}>Create author</button>
			<input
				type='number'
				placeholder='Duration (minutes)'
				value={courseData.duration}
				onChange={handleDurationChange}
			/>
			<button onClick={handleCreateCourse}>Create course</button>
		</div>
	);
};

export default CreateCourse;
