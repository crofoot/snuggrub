import React from 'react';
import { Card } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { GOOGLE_API_KEY } from 'utils/apiKey';
import { GooglePlace } from 'models/GooglePlace';

interface Props {
	item: GooglePlace;
}

export const CardItem = (props: Props) => {
	const { item } = props;
	return (
		<Card
			style={{
				height: '40%',
				width: Dimensions.get('screen').width * 0.5,
				marginHorizontal: 5,
			}}>
			<Card.Cover
				source={{
					uri: imageUri(item),
				}}
			/>
			<Card.Title title={item.name} />
		</Card>
	);
};

const imageUri = (item: GooglePlace) => {
	try {
		return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${200}&photoreference=${
			item.photos[0].photo_reference
		}&key=${GOOGLE_API_KEY}`;
	} catch (error) {
		return null;
	}
};
