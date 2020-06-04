import { combineReducers } from 'redux';

import UserReducer from './user';
import SettingsReducer from './settings';

export const reducers = combineReducers({
	user: UserReducer,
	settings: SettingsReducer,
});
