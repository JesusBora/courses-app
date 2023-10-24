import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
	const { id } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [authorNames, setAuthorNames] = useState([]);

	useEffect(() => {
		if (id) {
			// Fetch course details
			fetch(`http://localhost:4000/courses/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((data) => {
					if (data.successful) {
						setCourseDetails(data.result);
						// Extract author IDs and fetch author names
						const authorIds = data.result.authors;
						fetchAuthorNames(authorIds);
					} else {
						setError('API returned an unsuccessful response');
					}
					setLoading(false);
				})
				.catch((error) => {
					setError('Error fetching course details: ' + error.message);
					setLoading(false);
				});
		}
	}, [id]);

	const fetchAuthorNames = (authorIds) => {
		Promise.all(
			authorIds.map((authorId) =>
				fetch(`http://localhost:4000/authors/${authorId}`)
					.then((response) => response.json())
					.then((data) => {
						if (data.successful) {
							return data.result.name;
						} else {
							return 'Author not found';
						}
					})
					.catch((error) => {
						return 'Author fetch error: ' + error.message;
					})
			)
		).then((names) => {
			setAuthorNames(names);
		});
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!courseDetails) {
		return <div>Course details not found.</div>;
	}

	return (
		<div>
			<h2>{courseDetails.title}</h2>
			<p>{courseDetails.description}</p>
			<p>Creation Date: {courseDetails.creationDate}</p>
			<p>Duration: {courseDetails.duration}</p>
			<p>Authors: {authorNames.join(', ')}</p>
		</div>
	);
};

export default CourseDetails;
