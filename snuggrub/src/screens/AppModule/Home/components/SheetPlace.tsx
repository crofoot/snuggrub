import React from 'react';
import { GooglePlace } from 'models/GooglePlace';
import { Surface, Headline, useTheme } from 'react-native-paper';
import { Loader } from 'components/Loader';
import { View } from 'react-native';

interface Props {
	place: GooglePlace;
}

export const SheetPlace = (props: Props) => {
	const theme = useTheme();
	const { place } = props;
	if (place === null) {
		return (
			<View
				style={{ height: '100%', backgroundColor: theme.colors.background }}>
				<Loader />
			</View>
		);
	}

	return (
		<View
			style={{
				height: '100%',
				backgroundColor: theme.colors.background,
			}}>
			<Headline>{place.name}</Headline>
		</View>
	);
};
