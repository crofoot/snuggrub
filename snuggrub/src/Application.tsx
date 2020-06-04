import React from 'react';

// Application imports
import { secondaryColor } from 'theme/colors';
import { lightTheme, darkTheme } from 'theme/types';

// Redux imports
import { setUser } from 'actions/user';
import { Settings } from 'models/Settings';
import { loadSettings } from 'actions/settings';
import { UserService } from 'services/UserService';
import { useDispatch, useSelector } from 'react-redux';

// Component imports
import { Navigation } from './Navigation';
import { Flow } from 'react-native-animated-spinkit';
import { Surface, ThemeProvider } from 'react-native-paper';

// Load global app specific data in this component
export const Application = () => {
	const dispatch = useDispatch();

	const [loadingUser, setLoadingUser] = React.useState(true);
	const [loadingRedux, setLoadingRedux] = React.useState(true);
	const settings: Settings = useSelector((state: any) => state.settings);

	// componentDidMount
	React.useEffect(() => {
		loadReduxAsync();

		UserService.loadCurrentUser(
			(user) => {
				dispatch(setUser(user));
				setLoadingUser(false);
			},
			() => {
				setLoadingUser(false);
			}
		);
	}, [dispatch]);

	// Reload Redux state for whole application goes here
	const loadReduxAsync = () => {
		return Promise.all([dispatch(loadSettings())]).then(() => {
			setLoadingRedux(false);
		});
	};

	// if its still loading user redux or firebase user show loader
	if (loadingUser || loadingRedux) {
		return (
			<Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: secondaryColor }}>
				<Flow color='#fff' />
			</Surface>
		);
	}

	return (
		<ThemeProvider theme={settings.isDarkMode ? darkTheme : lightTheme}>
			<Navigation />
		</ThemeProvider>
	);
};
