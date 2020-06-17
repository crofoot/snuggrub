import React from 'react';
import { TextInput, Button, Checkbox, Caption } from 'react-native-paper';
import { View, Dimensions, SafeAreaView, Text } from 'react-native';

interface Props {
	navigate: () => void;
}
export const ForgotPasswordLink = (props: Props) => {
	return (
		<View style={{ flex: 2, alignItems: 'center', paddingTop: 5 }}>
			<Button uppercase={false} onPress={props.navigate}>
				<Text
					style={{
						textAlign: 'center',
						fontSize: 14,
						color: 'white',
						textDecorationLine: 'underline',
						textDecorationColor: 'white',
					}}>
					Forgot Password?
				</Text>
			</Button>
		</View>
	);
};
