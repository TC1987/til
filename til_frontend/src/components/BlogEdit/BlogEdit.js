import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { blogs_service_getOne, blogs_service_update } from '../../services/blogs';
import { message_update } from '../../reducers/messageReducer';
import { blogs_update } from '../../reducers/blogReducer';
import styles from './blogedit.module.scss';

const TITLE_LENGTH = 3;
const CONTENT_LENGTH = 3;

const BlogEdit = props => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [previousTitle, setPreviousTitle] = useState('');
	const [image, setImage] = useState(null);
	const [titleError, setTitleError] = useState('');
	const [contentError, setContentError] = useState('');

	useEffect(() => {
		blogs_service_getOne(props.match.params.id)
		.then(blog => {
			setTitle(blog.title);
			setContent(blog.content);
			setPreviousTitle(blog.title);
		})
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		let hasErrors = false;

		if (title.length < TITLE_LENGTH) {
			setTitleError('Title must be at least 3 characters.');
			hasErrors = true;
		}

		if (content.length < CONTENT_LENGTH) {
			setContentError('Content must be at least 3 characters.');
			hasErrors = true;
		}

		if (hasErrors) {
			setTimeout(() => setTitleError(''), 4000);
			setTimeout(() => setContentError(''), 4000);
			return;
		}

		const formData = new FormData();

		formData.set('title', title);
		formData.set('content', content);
		formData.set('image', image);
		formData.set('author', props.user.id);

		try {
			const updatedBlog = await blogs_service_update(props.match.params.id, formData);

			props.blogs_update(updatedBlog);
			props.message_update(`${ previousTitle } updated to ${ title }`);
			setTimeout(() => props.message_update(null), 3000);
			props.history.push(`/blogs/${ props.match.params.id }`);
		} catch (err) {
			console.log(err.message);
			props.message_update(err);
			setTimeout(() => props.message_update(null), 3000);
		}
	};

	return (
		<div className={ styles.container }>
			{ props.message && <p className={ styles.message }>{ props.message }</p> }
			<form onSubmit={ handleSubmit } className={ styles.form }>
				<input type='text' value={ title } onChange={ e =>  setTitle(e.target.value) }></input>
				{ titleError && <p className={ styles.validationError }>{ titleError }</p>}
				<textarea value={ content } onChange={ e => setContent(e.target.value) } className={ styles.form__content }></textarea>
				{ contentError && <p className={ styles.validationError }>{ contentError }</p>}
				<label htmlFor="file_upload" className={ styles.form__file__label }>{ image ? image.name : 'Choose File' }</label>
				<input type="file" name="image" id="file_upload" onChange={ e => setImage(e.target.files[0]) } className={ styles.form__file }></input>
				<button type="submit" className={ styles.form__button } onClick={ handleSubmit }>Update Post</button>
			</form >
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.user,
	message: state.message
});

const mapDispatchToProps = {
	message_update,
	blogs_update
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEdit);