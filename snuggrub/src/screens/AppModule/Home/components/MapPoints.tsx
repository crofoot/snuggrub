import React from 'react';
import { Marker } from 'react-native-maps';
import { GooglePlace } from 'models/GooglePlace';
import { Image } from 'react-native';

interface Props {
	places: GooglePlace[];
	onPress: (id: string) => void;
}

const carryOut = require('../../../../../assets/images/carry_out.png');
const dineIn = require('../../../../../assets/images/dine_in.png');
export const MapPoints = (props: Props) => {
	return (
		<React.Fragment>
			{props.places.map((place, index) => {
				return (
					<Marker
						onPress={() => props.onPress(place.id)}
						key={place.id}
						coordinate={{
							longitude: place.geometry.location.lng,
							latitude: place.geometry.location.lat,
						}}
						title={place.name}>
						<Image
							source={index % 2 === 0 ? carryOut : dineIn}
							style={{ height: 25, width: 25 }}
							resizeMode='contain'
						/>
					</Marker>
				);
			})}
		</React.Fragment>
	);
};
