export const user_login = user => {
	return {
		type: 'USER_LOGIN',
		payload: user
	};
};

export const user_update = updatedUser => {
	return {
		type: 'USER_UPDATE',
		payload: updatedUser
	}
}

export const user_logout = () => {
	return {
		type: 'USER_LOGOUT'
	}
}

const userReducer = (user = null, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
		case 'USER_UPDATE':
			return action.payload;
		case 'USER_LOGOUT':
			return null;
		default:
			return user;
	}
};

export default userReducer;