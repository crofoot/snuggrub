import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { logoutUser } from 'actions/user';
import { useDispatch } from 'react-redux';
import { errorColor } from 'theme/colors';
import { setDarkMode } from 'actions/settings';
import { clearStorageOnLogout } from '../../../redux/storage';

import { Layout } from 'components/Layout';
import { BottomModal } from 'components/BottomModal';
import { DrawerHeader } from 'components/DrawerHeader';
import { UserInformation } from './components/UserInformation';
import { AppSettingsInformation } from './components/AppSettings';
import { Button, Subheading, useTheme, Caption } from 'react-native-paper';

export const SettingsScreen = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [isDarkMode, setIsDarkMode] = React.useState(theme.dark);
	const [signOutModal, setSignOutModal] = React.useState(false);

	const handleDarkModeSwitch = async () => {
		setIsDarkMode(!isDarkMode);
		await dispatch(setDarkMode(!isDarkMode));
	};

	const handleLogout = () => {
		Promise.all([dispatch(logoutUser()), clearStorageOnLogout()]).then(() => dispatch(setDarkMode(false)));
	};

	return (
		<Layout>
			<DrawerHeader title='Settings' />
			<View style={styles.informationView}>
				<UserInformation />
				<AppSettingsInformation isDarkMode={isDarkMode} handleThemeChange={handleDarkModeSwitch} />
			</View>
			<View style={styles.signOutView}>
				<Button mode='contained' style={{ backgroundColor: errorColor }} onPress={() => setSignOutModal(true)}>
					<Subheading> Sign Out </Subheading>
				</Button>
			</View>
			<BottomModal closeModal={() => setSignOutModal(false)} isVisible={signOutModal}>
				<View style={styles.signOutTextView}>
					<Subheading>Are you sure you want to sign out?</Subheading>
				</View>
				<View style={styles.signOutModal}>
					<Button mode='outlined' style={styles.cancelButton} onPress={() => setSignOutModal(false)}>
						<Subheading>Cancel</Subheading>
					</Button>
					<Button mode='contained' style={styles.signOutButton} onPress={() => handleLogout()}>
						<Subheading>Sign Out</Subheading>
					</Button>
				</View>
			</BottomModal>
		</Layout>
	);
};

const styles = StyleSheet.create({
	signOutModal: {
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 40,
		alignItems: 'center',
	},
	signOutButton: {
		marginHorizontal: 4,
		backgroundColor: errorColor,
	},
	cancelButton: {
		marginHorizontal: 4,
	},
	informationView: {
		flex: 8,
	},
	signOutView: {
		flex: 1,
		marginHorizontal: Dimensions.get('window').width * 0.05,
	},
	signOutTextView: {
		marginVertical: 5,
	},
});
