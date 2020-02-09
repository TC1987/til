import axios from 'axios';

const baseUrl = '/api/users';

export const users_register = async newUser => {
	try {
		const response = await axios.post(`${baseUrl}`, newUser);
		return response.data;
	} catch (err) {
		throw err.response.data;
	}
}

export const users_getUsers = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const users_getUser = async id => {
	try {
		const response = await axios.get(`${baseUrl}/${id}`);
		return response.data;
	} catch (err) {
		throw err.response.data;
	}
};

export const users_update = async (updateObject) => {
	const options = {
		headers: {
			Authorization: `Bearer ${window.localStorage.getItem('token')}`
		}
	};

	const userId = JSON.parse(window.localStorage.getItem('user')).id;

	try {
		const response = await axios.patch(`${baseUrl}/${userId}`, updateObject, options);
		return response.data;
	} catch (err) {
		throw err.response.data;
	}	
};