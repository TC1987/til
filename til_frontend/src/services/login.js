import axios from 'axios';

export const login = async credentials => {
	try {
		const response = await axios.post('/login', credentials);
		return response.data;
	} catch (err) {
		throw err.response.data;
	}
};