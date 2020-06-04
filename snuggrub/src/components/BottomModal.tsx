import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

interface Props {
	isVisible: boolean;
	closeModal: () => void;
	children?: React.ReactNode;
}

export const BottomModal = (props: Props) => {
	return (
		<Modal onBackdropPress={props.closeModal} isVisible={props.isVisible} style={styles.view}>
			<Surface style={styles.content}>{props.children}</Surface>
		</Modal>
	);
};

const styles = StyleSheet.create({
	view: {
		justifyContent: 'flex-end',
		margin: 0
	},
	content: {
		padding: 22,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'rgba(0, 0, 0, 0.1)'
	}
});
