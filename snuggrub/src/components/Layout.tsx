import React from 'react';
import { darkBackgroundColor, lightBackgroundColor } from 'theme/colors';

import { useTheme } from 'react-native-paper';
import { View, SafeAreaView, StatusBar, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Props {
	children: React.ReactNode;
	autoDismissKeyboard?: boolean;
}

export const Layout = (props: Props) => {
	let theme = useTheme();

	const statusBar = () => {
		if (Platform.OS === 'android') {
			return (
				<StatusBar
					barStyle={theme.dark ? 'light-content' : 'dark-content'}
					backgroundColor={theme.dark ? darkBackgroundColor : lightBackgroundColor}
				/>
			);
		} else {
			return <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />;
		}
	};

	const screenBody = () => {
		if (props.autoDismissKeyboard) {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
					<SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
				</TouchableWithoutFeedback>
			);
		} else {
			return <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>;
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
			{statusBar()}
			{screenBody()}
		</View>
	);
};
