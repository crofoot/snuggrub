import { auth } from 'firebase';

import { User } from 'models/user';
import { SET_USER } from '../types';
import { clearStorageOnLogout } from '../storage';

export const setUser = (user: User) => {
	return {
		payload: user,
		type: SET_USER,
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		await Promise.all([auth().signOut(), clearStorageOnLogout()]);

		dispatch({
			type: SET_USER,
			payload: null,
		});
	};
};
