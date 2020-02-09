export const toggleSidebar = () => {
	return {
		type: 'TOGGLE_SIDEBAR'
	}
}

export const closeSidebar = () => {
	return {
		type: 'CLOSE_SIDEBAR'
	}
}

export default (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return !state;
		case 'CLOSE_SIDEBAR':
			return false;
		default:
			return state;
	}
}