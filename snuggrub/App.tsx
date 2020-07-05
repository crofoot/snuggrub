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
	// FIREBASE API KEY GOES HERE
};

initializeApp(firebaseConfig);
// end of firebase initialization

let customFonts = {
	// PlayfairDisplayItalic: require('./assets/fonts/Playfair-Display/PlayfairDisplayItalic.ttf'),
	PlayfairDisplay: require('./assets/Fonts/Playfair-Display/PlayfairDisplay.ttf'),
	ArcherusGrotesque: require('./assets/Fonts/ArcherusGrotesque/acherusgrotesque.otf'),
	RobotoRegular: require('./assets/Fonts/Roboto/Roboto-Regular.ttf'),
	RobotoBold: require('./assets/Fonts/Roboto/Roboto-Bold.ttf'),
	RobotoItalic: require('./assets/Fonts/Roboto/Roboto-Italic.ttf'),
	RobotoLight: require('./assets/Fonts/Roboto/Roboto-Light.ttf'),
	OpenSans: require('./assets/Fonts/OpenSans/OpenSans-Regular.ttf'),
	OpenSansBold: require('./assets/Fonts/OpenSans/OpenSans-Bold.ttf'),
	OpenSansExtraBold: require('./assets/Fonts/OpenSans/OpenSans-ExtraBold.ttf'),
	OpenSansLight: require('./assets/Fonts/OpenSans/OpenSans-Light.ttf'),
	OpenSansSemiBold: require('./assets/Fonts/OpenSans/OpenSans-SemiBold.ttf'),
	RalewayRegular: require('./assets/Fonts/Raleway/Raleway-Regular.ttf'),
	RalewayLight: require('./assets/Fonts/Raleway/Raleway-Light.ttf'),
	RalewayBold: require('./assets/Fonts/Raleway/Raleway-Bold.ttf'),
};

export default function App() {
	const [isAppReady, setIsAppReady] = React.useState(false);

	const cachedImagesAsync = (): Promise<any> => {
		const images = [
			require('./assets/images/currentLocation.png'),
			require('./assets/images/carry_out.png'),
			require('./assets/images/carry_out_inactive.png'),
			require('./assets/images/carry_out_tab.png'),
			require('./assets/images/dine_in.png'),
			require('./assets/images/star.png'),
			require('./assets/images/Delivery.png'),
			require('./assets/images/Delivery_inactive.png'),
			require('./assets/images/dine_in_table.png'),
			require('./assets/images/dine_in_table_inactive.png'),
			require('./assets/images/dine_out.png'),
			require('./assets/images/dine_out_inactive.png'),
		];
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
