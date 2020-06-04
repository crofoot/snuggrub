import React from 'react';

// Utils
import { setupTextColor, primaryColor } from 'theme/colors';

// Components
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	text: string;
}
export const Information = ({ text }: Props) => {
	return (
		<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
			<View style={{ flex: 1 }}>
				<MaterialCommunityIcons name='leaf' color={primaryColor} />
			</View>
			<View style={{ flex: 20 }}>
				<Subheading style={{ color: setupTextColor }}>{text}</Subheading>
			</View>
		</View>
	);
};
