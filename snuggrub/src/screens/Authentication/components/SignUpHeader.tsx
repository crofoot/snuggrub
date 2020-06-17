import React from 'react';
import { View, Text } from 'react-native';

export const SignUpHeader = () => {
	return (
		<View style={{ flex: 2, justifyContent: 'center' }}>
			<Text
				style={{
					textAlign: 'center',
					fontSize: 30,
					color: 'white',
					fontFamily: 'PlayfairDisplay',
				}}>
				Sign Up
			</Text>
		</View>
	);
};
