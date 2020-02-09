import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import useField from '../../hooks/useField';
import { login } from '../../services/login';
import { user_login } from '../../reducers/userReducer';
import { message_update } from '../../reducers/messageReducer';
import { setToken } from '../../utils/token';
import styles from './login.module.scss';

const EMAIL_LENGTH = 5;
const PASSWORD_LENGTH = 5;

const Login = props => {
	const email = useField('text', 'Email');
	const password = useField('password', 'Password');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		let hasErrors = false;

		if (email.attributes.value.length < EMAIL_LENGTH) {
			setEmailError('Email must be at least 5 characters.');
			hasErrors = true;
		}

		if (password.attributes.value.length < PASSWORD_LENGTH) {
			setPasswordError('Password must be at least 5 characters.');
			hasErrors = true;
		}

		if (hasErrors) {
			setTimeout(() => setEmailError(''), 4000);
			setTimeout(() => setPasswordError(''), 4000);
			return;
		}

		try {
			const { user, token } = await login({
				email: email.attributes.value,
				password: password.attributes.value
			});
			props.user_login(user);
			setToken(token); // This isn't doing anything right now.
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('user', JSON.stringify(user));
		} catch (err) {
			props.message_update(err.error);
			setTimeout(() => props.message_update(''), 3000);
			email.reset();
			password.reset();
		}
	};

	return (
		<div className={ styles.container }>
			<div className={ styles.image }></div>
			{/* <h4 className={ styles.heading }><span className={ styles.heading__bold }>Welcome</span> Back</h4> */}
			<form onSubmit={ handleSubmit } className={ styles.form }>
				<input { ...email.attributes } className={ styles.form__field }></input>
				<input { ...password.attributes } className={ styles.form__field }></input>
				{ emailError && <p className={ styles.validationError }>{ emailError }</p>}
				{ passwordError && <p className={ styles.validationError }>{ passwordError }</p>}
				<button type="submit" value="Login" className={ `${styles.form__button} ${styles.form__button__login}` }>Login</button>
			</form>
			<p>Don't have an account? <span className={ styles.bold }><Link to={'/register'} className={ styles.link }>Register</Link></span></p>
		</div>
	);
};

const mapDispatchToProps = {
	user_login,
	message_update
};

export default connect(null, mapDispatchToProps)(Login);