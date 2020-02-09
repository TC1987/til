import React, { useState, useEffect } from 'react';

import { users_getUser } from '../../services/users';

const User = props => {
	const [user, setUser] = useState(null);

	console.log(user);

	useEffect(() => {
		users_getUser(props.match.params.id)
			.then(user => setUser(user))
			.catch(err => console.log(err));
	}, []);

	const blogList = () => {
		return user.blogs.map(blog => (
			<tr key={ blog.id }>
				<td>{ blog.title }</td>
				<td>{ blog.content }</td>
				<td>{ blog.likes }</td>
			</tr>
		));
	};

	return user ?
		<>
			<p>{ user.name }'s Blogs</p>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Content</th>
						<th>Likes</th>
					</tr>
				</thead>
				<tbody>
					{ blogList() }
				</tbody>
			</table>
		</>
		:
		<h1>Loading</h1>;
};

export default User;