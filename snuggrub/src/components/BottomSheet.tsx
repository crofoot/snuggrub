import React from 'react';
import { Theme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export const BottomSheetHeader = ({ theme }: { theme: Theme }) => {
	return (
		<View style={[styles.header, { backgroundColor: theme.colors.background }]}>
			<View style={[styles.panelHeader, { backgroundColor: theme.colors.background }]}>
				<View style={[styles.panelHandle, { backgroundColor: theme.colors.text }]} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingTop: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		// justifyContent: 'flex-start',
		alignItems: 'center',
	},
	panelHandle: {
		width: 35,
		height: 4,
		borderRadius: 4,
		marginBottom: 10,
	},
});
