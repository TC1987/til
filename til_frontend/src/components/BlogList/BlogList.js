import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { blogs_getAll } from '../../services/blogs';

import { blogs_init, blogs_add } from '../../reducers/blogReducer';
import { message_update } from '../../reducers/messageReducer';

import BlogItem from '../BlogItem/BlogItem';

import styles from './bloglist.module.scss';

const blogList = (blogs, filter) => {
	const filteredBlogs = blogs.filter(blog => {
		return blog.title.includes(filter);
	});

	return filteredBlogs.map(blog => (
		<li key={blog.id} className={ styles.blog }>
			<BlogItem blog={blog} />
		</li>
	));
};

const Blogs = props => {
	useEffect(() => {
		blogs_getAll().then(blogs => {
			props.blogs_init(blogs);
		});
	}, []);

	return (
		<ul className={ styles.container }>
			{ blogList(props.blogs, props.filter) }
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user,
		blogs: state.blogs,
		message: state.message,
		filter: state.filter
	};
};

const mapDispatchToProps = {
	blogs_init,
	blogs_add,
	message_update
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
