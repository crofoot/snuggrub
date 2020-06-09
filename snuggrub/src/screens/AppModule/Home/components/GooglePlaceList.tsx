import React from 'react';

// utils models
import { GooglePlace } from 'models/GooglePlace';
import { RequestError } from 'react-promise-hooks';

// components
import { CardItem } from './CardItem';
import { FlatList } from 'react-native';
import { Title } from 'react-native-paper';

interface Props {
	placeResults: {
		loading: boolean;
		done: boolean;
		error: RequestError;
		data: GooglePlace[];
	};
}
export const GooglePlaceList = (props: Props) => {
	if (props.placeResults.loading) {
		return <Title>Loading</Title>;
	}

	return (
		<FlatList
			horizontal={true}
			data={props.placeResults.data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				return <CardItem item={item} />;
			}}
		/>
	);
};
