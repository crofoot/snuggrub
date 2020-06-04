import React from 'react';
import { useTheme } from 'react-native-paper';
import { Flow } from 'react-native-animated-spinkit';

interface Props {
	size?: number;
	color?: string;
}
export const Loader = (props: Props) => {
	const theme = useTheme();

	let color = theme.colors.accent;
	let size = 37;

	if (props.color) {
		color = props.color;
	}

	if (props.size) {
		size = props.size;
	}

	return <Flow color={color} size={size} />;
};
