import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { darkTheme } from 'theme/types';
import { selectionAsync } from 'expo-haptics';

interface Props {
	visible: boolean;
	setVisiblePassword: Function;
}

export const ShowPassword = (props: Props) => {
	return (
		<View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
			<Text style={{ fontSize: 16, color: 'white', textAlignVertical: 'center' }}>Show Password</Text>
			<Checkbox.Android
				theme={darkTheme}
				color='white'
				status={props.visible ? 'checked' : 'unchecked'}
				onPress={() => {
					props.setVisiblePassword(!props.visible);
					selectionAsync();
				}}
			/>
		</View>
	);
};
