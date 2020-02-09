import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Comments from '../Comments/Comments';
import useField from '../../hooks/useField';
import { getComments, addComment } from '../../services/comments';
import styles from './commentlist.module.scss';

const COMMENT_LENGTH = 3;

const CommentList = props => {
	const [comments, setComments] = useState([]);
	const comment = useField(null, 'Comment');
	const [commentError, setCommentError] = useState('');

	useEffect(() => {
		getComments(props.id).then(comments => {
			setComments(comments);
		});
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		let hasErrors = false;

		if (comment.attributes.value.length < COMMENT_LENGTH) {
			setCommentError('Comment must be at least 3 characters.');
			hasErrors = true;
		}

		if (hasErrors) {
			setTimeout(() => setCommentError(''), 4000);
			return;
		}

		const newComment = {
			comment: comment.attributes.value,
			author: props.user.id,
			authorName: props.user.name
		};

		comment.reset();

		try {
			const savedComment = await addComment(props.id, newComment);
			savedComment.author = {
				id: savedComment.author,
				name: props.user.name
			}
			setComments(comments => [...comments, savedComment]);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className={ styles.container }>
			<Comments comments={ comments } />
			{ props.user &&
				<form onSubmit={ handleSubmit } className={ styles.form }>
					<textarea { ...comment.attributes} className={ styles.form__content } />
					{ commentError && <p className={ styles.validationError }>{ commentError }</p>}
					<button type="submit" className={ styles.form__button }>Post Comment</button>
				</form>
			}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(CommentList);