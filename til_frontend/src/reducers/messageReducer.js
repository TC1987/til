export const message_update = message => {
	return {
		type: 'MESSAGE_UPDATE',
		payload: message
	}
};

const messageReducer = (message = null, action) => {
	switch (action.type) {
		case 'MESSAGE_UPDATE':
			return action.payload;
		default:
			return message;
	}
}

export default messageReducer;