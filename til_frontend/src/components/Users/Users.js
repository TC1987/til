import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { users_getUsers } from '../../services/users';

import styles from './users.module.scss';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		users_getUsers()
			.then(users => setUsers(users));
	}, []);

	const usersList = () => {
		return (
			users.map(user => (
				<tr key={ user.id }>
					<td><Link to={`/users/${user.id}`}>{ user.name }</Link></td>
					<td>{ user.blogs.length }</td>
				</tr>
			))
		);
	};

	return (
		<div className={ styles.container }>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th>Users</th>
						<th>Blogs Created</th>
					</tr>
				</thead>
				<tbody>
					{ usersList() }
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(Users);