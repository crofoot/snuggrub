import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { secondaryColor } from 'theme/colors';
import { Headline, Subheading, Button } from 'react-native-paper';

interface Props {
	isVisible: boolean;
	handleCloseModal: () => void;
}

export const ForgotPasswordModal = (props: Props) => {
	return (
		<Modal isVisible={props.isVisible}>
			<View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: secondaryColor }}>
				<Headline style={{ marginVertical: 5, color: '#fff' }}>We've sent you an email</Headline>
				<Subheading style={{ marginVertical: 5, color: '#fff' }}>
					You should be recieving an email shortly with directions
				</Subheading>
				<Button style={{ marginTop: 20, marginBottom: 10 }} mode='contained' onPress={props.handleCloseModal}>
					<Subheading>Sign In</Subheading>
				</Button>
			</View>
		</Modal>
	);
};
