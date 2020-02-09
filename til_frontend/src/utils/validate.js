const isEmail = (value, errors) => {
	const regex = ('@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"');

	if (!regex.test(value)) {
		errors.email = `Please enter a valid email.`;
	}
	return errors;
}

const isMaxLength = (value, max, errors) => {
	if (value.length > max) {
		errors.maxLength = `Must be less than ${ max } characters`
	}
	return errors;
}

const isMinLength = (value, min, errors) => {
	if (value.length < min) {
		errors.minLength = `Must be greater than ${ min } characters`;
	}
	return errors;
}

const isRequired = (value, errors) => {
	if (!value) {
		errors.isRequired = `Required`;
	}
	return errors;
}

module.exports = (value, validations) => {
	const errors = {};

	Object.keys(validations).forEach(validation => {
		switch (validation) {
			case 'isRequired':
				isRequired(value, errors);
				break;
			case 'isMinLength':
				isMinLength(value, validations[validation], errors);
				break;
			case 'isMaxLength':
				isMaxLength(value, validations[validation], errors);
				break;
			case 'isEmail':
				isEmail(value, validations[validation], errors);
		}
	});

	return errors;
}