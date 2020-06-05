import React from 'react';

// utils models
import { GooglePlace } from 'models/GooglePlace';
import { RequestError } from 'react-promise-hooks';

// components
import { FlatList, Dimensions } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { GOOGLE_API_KEY } from 'utils/apiKey';

interface Props {
	placeResults: {
		loading: boolean;
		done: boolean;
		error: RequestError;
		data: GooglePlace[];
	};
}
export const GooglePlaceList = (props: Props) => {
	const imageUri = (item: GooglePlace) => {
		try {
			return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${200}&photoreference=${
				item.photos[0].photo_reference
			}&key=${GOOGLE_API_KEY}`;
		} catch (error) {
			return null;
		}
	};

	if (props.placeResults.loading) {
		return <Title>Loading</Title>;
	}

	return (
		<FlatList
			horizontal={true}
			data={props.placeResults.data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				return (
					<Card style={{ height: '40%', width: Dimensions.get('screen').width * 0.5, marginHorizontal: 5 }}>
						<Card.Cover
							source={{
								uri: imageUri(item),
							}}
						/>
						<Card.Title title={item.name} />
					</Card>
				);
			}}
		/>
	);
};
