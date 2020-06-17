import React from 'react';
import Constants from 'expo-constants';
import { View, Text } from 'react-native';
import { Button, Caption } from 'react-native-paper';
import { darkSecondaryColor } from 'theme/colors';

interface Props {
	navigate: () => void;
	text: string;
}
export const Footer = (props: Props) => {
	return (
		<View style={{ flex: 2, alignItems: 'center' }}>
			<Button uppercase={false} onPress={props.navigate}>
				<Text
					style={{
						textAlign: 'center',
						fontSize: 14,
						color: 'white',
						textDecorationLine: 'underline',
						textDecorationColor: 'white',
					}}>
					{props.text}
				</Text>
			</Button>
			<Caption
				style={{
					textAlign: 'center',
					textAlignVertical: 'center',
					color: darkSecondaryColor,
				}}>
				v {Constants.manifest.version}
			</Caption>
		</View>
	);
};
