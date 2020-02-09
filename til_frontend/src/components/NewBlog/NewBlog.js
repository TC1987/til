import React, { useState } from 'react';
import { connect } from 'react-redux';

import { blogs_create } from '../../services/blogs';
import { blogs_add } from '../../reducers/blogReducer';
import { message_update } from '../../reducers/messageReducer';
import useField from '../../hooks/useField';
import styles from './newblog.module.scss';

const TITLE_LENGTH = 3;
const CONTENT_LENGTH = 3;

const NewBlog = props => {
	const title = useField('text', 'Title');
	const content = useField(null, 'Content');
	const [image, setImage] = useState(null);
	const [titleError, setTitleError] = useState('');
	const [contentError, setContentError] = useState('');

	const fileChange = e => {
		setImage(e.target.files[0]);
	}

	const handleSubmit = async e => {
		e.preventDefault();

		let hasErrors = false;

		if (title.attributes.value.length < TITLE_LENGTH) {
			setTitleError('Title must be at least 3 characters.');
			hasErrors = true;
		}

		if (content.attributes.value.length < CONTENT_LENGTH) {
			setContentError('Content must be at least 3 characters.');
			hasErrors = true;
		}

		if (hasErrors) {
			setTimeout(() => setTitleError(''), 4000);
			setTimeout(() => setContentError(''), 4000);
			return;
		}

		const formData = new FormData();
		formData.set('title', title.attributes.value);
		formData.set('content', content.attributes.value);
		formData.set('image', image);
		formData.set('author', props.user.id)

		try {
			const createdBlog = await blogs_create(formData);

			props.blogs_add(createdBlog);
			props.message_update(`New Blog Created: ${ title.attributes.value }`);
			setTimeout(() => props.message_update(null), 3000);
			title.reset();
			content.reset();
			props.history.push(`/`);
		} catch (err) {
			console.log(err);
			props.message_update(err);
			setTimeout(() => props.message_update(null), 3000);
		}
	};

	return (
		<div className={ styles.container }>
			{ props.message && <p className={ styles.message }>{ props.message }</p> }
			<form onSubmit={handleSubmit} className={ styles.form }>
				<input {...title.attributes}></input>
				{ titleError && <p className={ styles.validationError }>{ titleError }</p>}
				<textarea {...content.attributes} className={ styles.form__content }></textarea>
				{ contentError && <p className={ styles.validationError }>{ contentError }</p>}
				<label htmlFor="file_upload" className={ styles.form__file__label }>{ image ? image.name : 'Choose File' }</label>
				<input type="file" name="image" id="file_upload" onChange={ fileChange } className={ styles.form__file }></input>
				<button type="submit" className={ styles.form__button } onClick={ handleSubmit }>Create Post</button>
			</form >
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.user,
	message: state.message
});

const mapDispatchToProps = {
	blogs_add,
	message_update
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog);
