import React from 'react';

// Hooks, Utils
import { User } from 'models/user';
import { setUser } from 'actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsService } from 'services/SettingsService';
import { setupTextColor, secondarySheetColor } from 'theme/colors';

// Components
import { View, StyleSheet } from 'react-native';
import { AuthLayout } from '../components/AuthLayout';
import { Information } from './components/Information';
import { ThemeIconButton } from './components/ThemeIconButton';
import { Headline, Subheading, Button, Title } from 'react-native-paper';

export const SetupUser = () => {
	const dispatch = useDispatch();
	const user: User | null = useSelector(({ user }: any) => user);

	// Form state
	const [submitting, setSubmitting] = React.useState(false);
	const [isDarkMode, setIsDarkMode] = React.useState(false);

	// Saves to redux and local storage and navigates
	const finshedSettingUpUser = () => {
		setSubmitting(true);
		SettingsService.createSettings({
			isDarkMode,
		})
			.then(() => {
				dispatch(
					setUser({
						isNewUser: false,
						email: user.email,
						displayName: user.displayName,
					})
				);
			})
			.catch(() => {
				// add some error handling here
				setSubmitting(false);
			});
	};

	return (
		<React.Fragment>
			<AuthLayout>
				<View style={styles.headerView}>
					<Headline style={styles.bannerTitle}>Welcome to Snuggrub!</Headline>
					<Information text="Before we get started let's quickly setup your account." />
				</View>
				<View style={styles.bodyView}>
					<Subheading style={styles.questionTitle}>What theme would you like?</Subheading>
					<View style={styles.themeIconsView}>
						<ThemeIconButton isSelected={!isDarkMode} icon='md-sunny' name='Light' onPress={() => setIsDarkMode(false)} />
						<ThemeIconButton isSelected={isDarkMode} icon='md-moon' name='Dark' onPress={() => setIsDarkMode(true)} />
					</View>
				</View>
				<View style={styles.footerView}>
					<Button loading={submitting} disabled={submitting} mode='contained' uppercase={false} onPress={finshedSettingUpUser}>
						<Title style={{ color: setupTextColor }}>Get Started!</Title>
					</Button>
				</View>
			</AuthLayout>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	headerView: {
		flex: 5,
	},
	bodyView: {
		flex: 5,
	},
	footerView: {
		flex: 1,
	},
	bannerTitle: {
		fontSize: 28,
		color: 'white',
		fontWeight: '700',
		marginVertical: 5,
	},
	questionTitle: {
		marginBottom: 10,
		fontWeight: '600',
		textAlign: 'center',
		color: setupTextColor,
	},
	themeIconsView: {
		flex: 2,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	currencyView: {
		flex: 3,
	},
	currencyButton: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: secondarySheetColor,
	},
	setupText: {
		color: setupTextColor,
	},
});
