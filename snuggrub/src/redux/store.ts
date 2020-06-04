import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';

import { defaultSettings } from 'models/Settings';

const initialStore = {
	user: null,
	settings: defaultSettings,
};

export const store = createStore(reducers, initialStore, applyMiddleware(thunk));
