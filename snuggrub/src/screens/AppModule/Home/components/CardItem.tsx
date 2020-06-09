import React from 'react';
import { Card, Title } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { GOOGLE_API_KEY } from 'utils/apiKey';
import { GooglePlace } from 'models/GooglePlace';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
	item: GooglePlace;
}

export const CardItem = (props: Props) => {
	const { item } = props;
	return (
		<Card
			style={{
				width: Dimensions.get('screen').width * 0.5,
				marginHorizontal: 5,
				flex: 1,
			}}>
			<Card.Cover
				source={{
					uri: imageUri(item),
				}}
			/>
			<LinearGradient
				colors={['transparent', 'rgba(0,0,0,1)']}
				start={[0.5, 0.2]}
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					height: 300,
				}}
			/>

			<Title
				style={{
					position: 'absolute',
					bottom: 0,
					color: 'red',
					// fontFamily: 'PlayfairDisplay-Italic',
				}}>
				{' '}
				Test{' '}
			</Title>
			{/* <Card.Content style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
			</Card.Content> */}
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
