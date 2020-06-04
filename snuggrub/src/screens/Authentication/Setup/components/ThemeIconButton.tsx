import React from 'react';
// Utils
import { primaryColor, setupTextColor } from 'theme/colors';

// Components
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

interface Props {
	name: string;
	icon: string;
	isSelected: boolean;
	onPress: () => void;
}

export const ThemeIconButton = (props: Props) => {
	return (
		<View style={{ alignItems: 'center' }}>
			<TouchableRipple onPress={props.onPress}>
				<Ionicons name={props.icon} size={40} color={props.isSelected ? primaryColor : setupTextColor} />
			</TouchableRipple>
			<Animatable.Text transition='color' duration={450} easing='linear' style={{ color: props.isSelected ? primaryColor : setupTextColor }}>
				{props.name}
			</Animatable.Text>
		</View>
	);
};
