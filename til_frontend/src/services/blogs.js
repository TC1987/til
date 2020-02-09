import axios from 'axios';

const baseUrl = '/api/blogs';

export const blogs_getAll = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (err) {
		throw err.message;
	}
};

export const blogs_service_getOne = async id => {
	try {
		const response = await axios.get(`${baseUrl}/${id}`);
		return response.data;
	} catch (err) {
		throw err.message;
	}
};

export const blogs_create = async blog => {
	const options = {
		headers: {
			Authorization: `Bearer ${window.localStorage.getItem('token')}`
		}
	};

	try {
		const response = await axios.post(baseUrl, blog, options);
		return response.data;
	} catch (err) {
		throw err.response.data.error;
	}
};

export const blogs_service_update = async (blogId, blog) => {
	const url = `${baseUrl}/${blogId}`;

	const options = {
		headers: {
			Authorization: `Bearer ${window.localStorage.getItem('token')}`
		}
	};

	try {
		const response = await axios.put(url, blog, options);
		return response.data;
	} catch (err) {
		throw err.response.data.error;
	}
};

export const blogs_service_delete = async id => {
	const url = `${baseUrl}/${id}`;
	const options = {
		headers: {
			Authorization: `Bearer ${window.localStorage.getItem('token')}`
		}
	};

	try {
		const response = await axios.delete(url, options);
		return response.data;
	} catch (err) {
		throw err.message;
	}
};