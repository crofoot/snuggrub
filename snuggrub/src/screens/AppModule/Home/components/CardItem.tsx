import React from 'react';
import { LocationData } from 'expo-location';
import { GOOGLE_API_KEY } from 'utils/apiKey';
import { GooglePlace } from 'models/GooglePlace';
import { getDistance, getPreciseDistance } from 'geolib';

import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Dimensions, Image, View } from 'react-native';
import { Card, Title, TouchableRipple } from 'react-native-paper';
import { blue100 } from 'react-native-paper/lib/typescript/src/styles/colors';

interface Props {
	item: GooglePlace;
	isFocused: boolean;
	onFocus: () => void;
	location: LocationData;
}

const METER_TO_MILE_RATIO: number = 0.000621371;

const zoomOut = {
	0: {
		opacity: 1,
		scale: 1,
	},
	0.5: {
		opacity: 1,
		scale: 0.3,
	},
	1: {
		opacity: 0,
		scale: 0,
	},
};

export const CardItem = (props: Props) => {
	const { item, location } = props;
	//current location

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
		<TouchableRipple
			onPress={props.onFocus}
			style={{
				shadowOpacity: 0.12,
				borderRadius: 15,
				marginHorizontal: 5,
				justifyContent: 'flex-end',
			}}>
			<Animatable.View
				transition='height'
				direction='alternate'
				style={{
					width: Dimensions.get('screen').width * 0.4,
					height: props.isFocused
						? Dimensions.get('screen').height * 0.3
						: Dimensions.get('screen').height * 0.25,
					borderRadius: 15,
					backgroundColor: 'blue',
					overflow: 'hidden',
				}}>
				<Card style={{}}>
					<Card.Cover
						source={{
							uri: imageUri(item),
						}}
						style={{
							width: Dimensions.get('screen').width * 0.4,
							height: props.isFocused
								? Dimensions.get('screen').height * 0.3
								: Dimensions.get('screen').height * 0.25,
						}}
					/>
					<LinearGradient
						colors={[
							'transparent',
							props.isFocused ? 'rgba(51,102,102,0.8)' : 'rgba(0,0,0,0.8)',
						]}
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
							lineHeight: 15,
							paddingBottom: 7,
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
								paddingLeft: 6,
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
			</Animatable.View>
		</TouchableRipple>
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
