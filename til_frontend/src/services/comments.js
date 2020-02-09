import axios from 'axios';

export const getComments = async id => {
	const response = await axios.get(`/api/blogs/${id}/comments`);
	return response.data;
};

export const addComment = async (id, comment) => {
	const response = await axios.post(`/api/blogs/${id}/comments`, comment);
	return response.data;
};