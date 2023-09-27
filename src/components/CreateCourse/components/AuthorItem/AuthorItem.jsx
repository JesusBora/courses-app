import React from 'react';

const AuthorItem = ({ author, onClick, isDeleteButton }) => {
	return (
		<li>
			{author.name}
			{isDeleteButton && (
				<button onClick={() => onClick(author.id)}>Delete author</button>
			)}
		</li>
	);
};

export default AuthorItem;
