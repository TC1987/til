import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { users_register } from '../../services/users';
import { user_login } from '../../reducers/userReducer';
import { message_update } from '../../reducers/messageReducer';

import useField from '../../hooks/useField';

import styles from './register.module.scss';

const NAME_LENGTH = 3;
const EMAIL_LENGTH = 5;
const PASSWORD_LENGTH = 5;

const Register = props => {
	const name = useField('text', 'Name');
	const email = useField('email', 'Email');
	const password = useField('password', 'Password');
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const register = async e => {
		e.preventDefault();

		let hasErrors = false;

		if (name.attributes.value.length < NAME_LENGTH) {
			setNameError('Name must be at least 3 characters.');
			hasErrors = true;
		}

		if (email.attributes.value.length < EMAIL_LENGTH) {
			setEmailError('Email must be at least 5 characters.');
			hasErrors = true;
		}

		if (password.attributes.value.length < PASSWORD_LENGTH) {
			setPasswordError('Password must be at least 5 characters.');
			hasErrors = true;
		}

		if (hasErrors) {
			setTimeout(() => setNameError(''), 4000);
			setTimeout(() => setEmailError(''), 4000);
			setTimeout(() => setPasswordError(''), 4000);
			return;
		}

		const userData = {
			name: name.attributes.value,
			email: email.attributes.value,
			password: password.attributes.value
		}

		try {
			const { user, token } = await users_register(userData);
			props.user_login(user);
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('user', JSON.stringify(user));
			props.message_update(`Welcome to BlogWorld ${user.name}.`);
			setTimeout(() => props.message_update(''), 3000);
			props.history.push('/');
		} catch (err) {
			console.log(err);
			name.reset();
			email.reset();
			password.reset();
		}
	}

	return (
		<div className={ styles.container }>
			<div className={ styles.image }></div>
			<form onSubmit={ register } className={ styles.form }>
				<input { ...name.attributes } className={ styles.form__field } />
				<input { ...email.attributes } className={ styles.form__field } />
				<input { ...password.attributes } className={ styles.form__field }/>
				{ nameError && <p className={ styles.validationError }>{ nameError }</p>}
				{ emailError && <p className={ styles.validationError }>{ emailError }</p>}
				{ passwordError && <p className={ styles.validationError }>{ passwordError }</p>}
				<button type="submit" value="Register" className={ `${styles.form__button} ${styles.form__button__login}` }>Register</button>
			</form>
			<p>Already have an account? <span className={ styles.bold }><Link to={'/login'} className={ styles.link }>Login</Link></span></p>
		</div>
	)
}

const mapDispatchToProps = {
	user_login,
	message_update
};

export default connect(null, mapDispatchToProps)(Register);