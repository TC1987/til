import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { blogs_update, blogs_delete } from '../../reducers/blogReducer';
import styles from './blogitem.module.scss';

const Blog = props => {
	const { id, title, content, author, likes, pictureUrl, comments, updatedAt } = props.blog;
	
	const formatDate = timestamp => {
		if (!timestamp) {
			return;
		}

		const date = new Date(timestamp);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
	}

	const formatContent = content => {
		if (content.length > 100) {
			return `${content.slice(0, 100)}...`;
		}

		return content;
	}

	return (
		<div className={ styles.blog }>
			<div className={ styles.content }>
				{ pictureUrl && <Link to={`/blogs/${id}`}><img src={ pictureUrl } alt="uploaded-image" className={ styles.content__image }></img></Link> }
				<p className={ styles.text__date }>{ formatDate(updatedAt) }</p>
				<p><Link to={`/blogs/${id}`} className={ styles.text__title }>{title}</Link></p>
				<p className={ styles.text__content }>{formatContent(content)}</p>
				<p className={ styles.text__author }>by {author.name}</p>
			</div>
			<div className={ styles.stats }>
				<p className={ styles.stats__likes }>Likes {likes}</p>
				<p className={ styles.stats__commentCount }>Comments {comments.length}</p>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	blogs_update,
	blogs_delete
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);