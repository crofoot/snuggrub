import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Snackbar, useTheme, Title } from 'react-native-paper';
import { primaryColor, errorColor } from 'theme/colors';

export interface SnackBarState {
	text: string;
	isError: boolean;
	isVisible: boolean;
}

export const defaultSnackBarState: SnackBarState = {
	text: '',
	isError: false,
	isVisible: false
};

interface Props {
	isVisible: boolean;
	onDismiss: () => void;
	duration?: number;
	text: string;
	isError: boolean;
	overrideColor?: string;
}

export const CustomSnackbar = (props: Props) => {
	const theme = useTheme();

	let borderColor: string = primaryColor;

	if (props.overrideColor) {
		borderColor = props.overrideColor;
	} else if (props.isError) {
		borderColor = errorColor;
	}

	return (
		<Snackbar
			visible={props.isVisible}
			onDismiss={props.onDismiss}
			duration={props.duration ? props.duration : 3500}
			style={{
				backgroundColor: theme.colors.surface,
				borderLeftColor: borderColor,
				borderLeftWidth: 12,
				marginBottom: Dimensions.get('screen').height * 0.1
			}}>
			<Title>{props.text}</Title>
		</Snackbar>
	);
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center'
	}
});
