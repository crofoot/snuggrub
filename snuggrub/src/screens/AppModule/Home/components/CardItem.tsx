import React from 'react';
import { Card, Title } from 'react-native-paper';
import { Dimensions, Image, View } from 'react-native';
import { GOOGLE_API_KEY } from 'utils/apiKey';
import { GooglePlace } from 'models/GooglePlace';
import { LinearGradient } from 'expo-linear-gradient';
import { LocationData } from 'expo-location';
import { getDistance, getPreciseDistance } from 'geolib';

interface Props {
	location: LocationData;
	item: GooglePlace;
}

const METER_TO_MILE_RATIO: number = 0.000621371;

export const CardItem = (props: Props) => {
	const { item, location } = props;
	//current location
	// console.log(location.coords.latitude, location.coords.longitude);

	const displayDistance = () => {
		let distanceInMeters = getPreciseDistance(
			{
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			},
			{
				latitude: props.item.geometry.location.lat,
				longitude: props.item.geometry.location.lng,
			}
		);

		let miles = distanceInMeters * METER_TO_MILE_RATIO;

		return `${miles.toFixed(2)}mi, `;
	};
	return (
		<Card
			style={{
				width: Dimensions.get('screen').width * 0.4,
				height: Dimensions.get('screen').width * 0.5,
				marginHorizontal: 5,
				borderRadius: 15,
				overflow: 'hidden',
			}}>
			<Card.Cover
				source={{
					uri: imageUri(item),
				}}
				style={{
					borderRadius: 50,
				}}
			/>
			<LinearGradient
				colors={['transparent', 'rgba(0,0,0,0.8)']}
				start={[0.5, 0.4]}
				end={[0.5, 0.6]}
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
					bottom: 15,
					color: 'white',
					paddingLeft: 5,
					fontSize: 13,
					fontFamily: 'OpenSansSemiBold',
				}}>
				{props.item.name}
			</Title>
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<Title
					style={{
						// position: 'absolute',
						// bottom: 0,
						color: 'white',
						paddingHorizontal: 2,
						fontSize: 11,
						fontFamily: 'OpenSansLight',
					}}>
					{displayDistance()}
					{props.item.rating}
				</Title>
				<Image
					source={require('../../../../../assets/images/star.png')}
					style={{
						height: 13,
						width: 13,
					}}
					resizeMode='contain'
				/>
			</View>
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
