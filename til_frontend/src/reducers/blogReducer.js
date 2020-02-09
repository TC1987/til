export const blogs_init = blogs => {
	return {
		type: 'BLOGS_INIT',
		payload: blogs
	};
};

export const blogs_add = blog => {
	return {
		type: 'BLOGS_ADD',
		payload: blog
	};
};

export const blogs_update = updated_content => {
	return {
		type: 'BLOGS_UPDATE',
		payload: updated_content
	};
};

export const blogs_delete = id => {
	return {
		type: 'BLOGS_DELETE',
		id
	};
};

const blogReducer = (blogs = [], action) => {
	switch (action.type) {
		case 'BLOGS_INIT':
			return [...action.payload];
		case 'BLOGS_ADD':
			return [...blogs, action.payload];
		case 'BLOGS_UPDATE':
			const index = blogs.findIndex(blog => blog.id === action.payload.id);
			return blogs.slice(0, index).concat(action.payload).concat(blogs.slice(index + 1));
		case 'BLOGS_DELETE':
			return blogs.filter(blog => blog.id !== action.id);
		default:
			return blogs;
	}
};

export default blogReducer;