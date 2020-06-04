import { SET_USER } from '../types';

export default function(state = null, action) {
	switch (SET_USER) {
		case action.type:
			return action.payload;

		default:
			return state;
	}
}
