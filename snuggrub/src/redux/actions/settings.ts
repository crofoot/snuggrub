import { AsyncStorage } from 'react-native';
import { STORED_SETTINGS } from '../storage';
import { SET_THEME, SET_SETTINGS, SET_RECURRING_COLOR } from '../types';
import { Settings, defaultSettings } from 'models/Settings';

export const setDarkMode = (darkMode: boolean) => {
	return async (dispatch, getState) => {
		try {
			let settings: Settings = getState().settings;
			settings.isDarkMode = darkMode;

			await AsyncStorage.setItem(STORED_SETTINGS, JSON.stringify(settings)).catch(() => {
				throw Error('');
			});

			dispatch({
				type: SET_THEME,
				payload: darkMode,
			});
		} catch (error) {
			alert('Unable to set theme');
		}
	};
};

export const setColor = (color: string) => {
	return async (dispatch, getState) => {
		try {
			let settings: Settings = getState().settings;
			settings.recurringColor = color;

			await AsyncStorage.setItem(STORED_SETTINGS, JSON.stringify(settings)).catch(() => {
				throw Error('');
			});

			dispatch({
				type: SET_RECURRING_COLOR,
				payload: color,
			});
		} catch (error) {
			alert('Unable to set theme');
		}
	};
};

export const setSettings = (settings: Settings) => {
	return async (dispatch) => {
		try {
			await AsyncStorage.setItem(STORED_SETTINGS, JSON.stringify(settings)).catch(() => {
				throw Error('');
			});

			dispatch({
				type: SET_SETTINGS,
				payload: settings,
			});
		} catch (error) {
			alert('Unable to set theme');
		}
	};
};

export const loadSettings = () => {
	return async (dispatch) => {
		try {
			let stringifiedSettings = await AsyncStorage.getItem(STORED_SETTINGS);

			if (stringifiedSettings) {
				let settings: Settings = JSON.parse(stringifiedSettings);

				if (settings) {
					dispatch({
						type: SET_SETTINGS,
						payload: settings,
					});
				} else {
					dispatch({
						type: SET_SETTINGS,
						payload: defaultSettings,
					});
				}
			} else {
				dispatch({
					type: SET_SETTINGS,
					payload: defaultSettings,
				});
			}
		} catch (error) {
			dispatch({
				type: SET_SETTINGS,
				payload: defaultSettings,
			});
		}
	};
};
