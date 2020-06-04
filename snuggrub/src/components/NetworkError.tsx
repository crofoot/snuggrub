import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	color: string;
	iconSize?: number;
	refetch: () => Promise<void>;
}

export const NetworkError = (props: Props) => {
	let iconSize = 36;

	if (props.iconSize) {
		iconSize = props.iconSize;
	}

	return (
		<React.Fragment>
			<TouchableOpacity onPress={props.refetch}>
				<View style={{ alignItems: 'center' }}>
					<MaterialCommunityIcons name='robot' size={iconSize} color={props.color} />
					<Text
						style={{
							color: props.color,
							fontWeight: '600',
							fontSize: 16,
							textAlign: 'center',
						}}>
						We ran into a network issue
					</Text>
					<Text
						style={{
							color: props.color,
							fontWeight: '600',
							fontSize: 16,
							textAlign: 'center',
						}}>
						Click to refresh
					</Text>
				</View>
			</TouchableOpacity>
		</React.Fragment>
	);
};
