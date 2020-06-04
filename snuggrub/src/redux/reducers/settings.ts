import { SET_THEME, SET_SETTINGS, SET_RECURRING_COLOR } from '../types';

export default function (state = null, action) {
	switch (action.type) {
		case SET_THEME:
			return {
				...state,
				isDarkMode: action.payload,
			};
		case SET_RECURRING_COLOR:
			return {
				...state,
				recurringColor: action.payload,
			};
		case SET_SETTINGS:
			return action.payload;
		default:
			return state;
	}
}
