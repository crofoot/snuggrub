import React from 'react';
import { Subheading, useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';

export const PriceRate = ({ rate }: { rate: number }) => {
	const theme = useTheme();
	if (rate === undefined) {
		return <Subheading>n/a </Subheading>;
	}

	const FilledPrice = () => (
		<Subheading
			style={{
				fontSize: 18,
				fontWeight: 'bold',
				color: theme.colors.text,
				fontFamily: 'RalewayBold',
				letterSpacing: 5,
			}}>
			$
		</Subheading>
	);

	const EmptyPrice = () => (
		<Subheading
			style={{
				fontSize: 18,
				fontFamily: 'RalewayBold',
				color: '#a6a6a6',
				letterSpacing: 5,
			}}>
			$
		</Subheading>
	);

	return (
		<View style={{ marginRight: 10, flexDirection: 'row' }}>
			{Array(rate)
				.fill(0)
				.map(() => (
					<FilledPrice />
				))}
			{Array(4 - rate)
				.fill(0)
				.map(() => (
					<EmptyPrice />
				))}
		</View>
	);
};
