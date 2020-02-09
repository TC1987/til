export const updateFilter = filter => {
	return {
		type: 'UPDATE_FILTER',
		payload: filter
	}
}

export default (state = '', action) => {
	switch (action.type) {
		case 'UPDATE_FILTER':
			return action.payload;
		default:
			return state;
	}
}