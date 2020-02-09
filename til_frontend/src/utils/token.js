export let token;

export const setToken = jwt => {
	token = `Bearer ${jwt}`;
};