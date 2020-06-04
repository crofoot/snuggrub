import { AsyncStorage } from 'react-native';

export const LOCAL_USER = 'snuggrubOfflineUser';
export const STORED_SETTINGS = 'snuggrubStoredTheme';

export const clearStorageOnLogout = () => {
	return AsyncStorage.multiRemove([LOCAL_USER, STORED_SETTINGS]);
};
