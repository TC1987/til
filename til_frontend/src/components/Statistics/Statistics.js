import React from 'react';
import { connect } from 'react-redux';

import styles from './statistics.module.scss';

const Statistics = ({ user }) => {
	console.log(user);
	return (
		<div className={ styles.container }>
			<p>Liked Blogs: { user.likedBlogs.length }</p>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Statistics);