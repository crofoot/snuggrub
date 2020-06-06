import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { initializeApp } from 'firebase/app';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Application } from './src/Application';

import 'firebase/firestore';
// firebase initialization
let firebaseConfig = {
	apiKey: 'AIzaSyCDrhWeZmcp27Ch5GEgILvY_hPzkGmuYgA',
	authDomain: 'snuggrub-development.firebaseapp.com',
	databaseURL: 'https://snuggrub-development.firebaseio.com',
	projectId: 'snuggrub-development',
	storageBucket: 'snuggrub-development.appspot.com',
	messagingSenderId: '1007510186615',
	appId: '1:1007510186615:web:33acffa5946152fc993472',
	measurementId: 'G-86V2GZ9MWW',
};
initializeApp(firebaseConfig);
// end of firebase initialization

let customFonts = {
	// 'PlayfairDisplay-Italic': require('./assets/fonts/Playfair-Display/PlayfairDisplay-Italic.ttf'),
	'PlayfairDisplay': require('./assets/Fonts/Playfair-Display/PlayfairDisplay.ttf'),
  };

export default function App() {
	const [isAppReady, setIsAppReady] = React.useState(false);

	const cachedImagesAsync = (): Promise<any> => {
		const images = [require('./assets/images/marker.png')];
		//require('./assets/appLogo.png')
		const cacheImages = images.map((image) => {
			return Asset.fromModule(image).downloadAsync();
		});

		return Promise.all([Font.loadAsync(customFonts), ...cacheImages]);
	};

	if (!isAppReady) {
		return (
			<AppLoading startAsync={cachedImagesAsync} onFinish={() => setIsAppReady(true)} onError={() => alert('An error occurred while loading Leaf')} />
		);
	} else {
		return (
			<Provider store={store}>
				<Application />
			</Provider>
		);
	}
}
