import React from 'react';

import { StyleSheet, View } from 'react-native';
import { IconButton, Subheading } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

interface Props {
	title: string;
	leftIcon?: string;
	rightIcon?: string;
	onPressleftIcon?: () => void;
	onPressRightIcon?: () => void;
}

export const Header = (props: Props) => {
	let navigation = useNavigation();

	const left = () => {
		if (props.leftIcon) {
			return <IconButton style={styles.leftIcon} icon={props.leftIcon} size={28} onPress={props.onPressleftIcon} />;
		} else {
			return null;
		}
	};

	const right = () => {
		if (props.rightIcon) {
			return <IconButton style={styles.rightIcon} icon={props.rightIcon} size={28} onPress={props.onPressRightIcon} />;
		} else {
			return null;
		}
	};
	return (
		<View style={styles.headerView}>
			{left()}
			<Subheading style={styles.subheading}>{props.title}</Subheading>
			{right()}
		</View>
	);
};

const styles = StyleSheet.create({
	headerView: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	subheading: {
		fontSize: 24,
		fontWeight: '600',
		marginRight: 'auto',
		marginLeft: 20
	},
	rightIcon: {
		marginLeft: 'auto'
	},
	leftIcon: {
		marginRight: 'auto'
	}
});
