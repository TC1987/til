import { useState } from 'react';

const useField = (type, placeholder, initialValue = '') => {
	const [value, setValue] = useState(initialValue);

	const onChange = e => {
		setValue(e.target.value);
	};

	const reset = () => {
		setValue(initialValue);
	};

	return {
		attributes: {
			type,
			placeholder,
			value,
			onChange
		},
		reset
	};
};

export default useField;