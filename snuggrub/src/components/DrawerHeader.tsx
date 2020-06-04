import React from 'react';

import { StyleSheet, View } from 'react-native';
import { IconButton, Subheading } from 'react-native-paper';

import { useNavigation, DrawerActions } from '@react-navigation/native';

interface Props {
	title: string;
	rightIcon?: string;
	onPressRightIcon?: () => void;
	right?: JSX.Element;
}

export const DrawerHeader = (props: Props) => {
	let navigation = useNavigation();

	const right = () => {
		if (props.rightIcon) {
			return <IconButton style={styles.rightIcon} icon={props.rightIcon} size={28} onPress={props.onPressRightIcon} />;
		} else if (props.right) {
			return props.right;
		} else {
			return null;
		}
	};
	return (
		<View style={styles.headerView}>
			<IconButton icon='menu' size={28} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
			<Subheading style={styles.subheading}>{props.title}</Subheading>
			{right()}
		</View>
	);
};

const styles = StyleSheet.create({
	headerView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subheading: {
		fontSize: 24,
		fontWeight: '600',
	},
	rightIcon: {
		marginLeft: 'auto',
	},
});
