import React from 'react';

const Input = (props) => {
	return (
		<input
			type={props.type}
			placeholder={props.placeHolder}
			name={props.name}
			id={props.id}
		/>
	);
};

export default Input;
