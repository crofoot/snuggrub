import React from 'react';
import { Marker } from 'react-native-maps';
import { GooglePlace } from 'models/GooglePlace';
import { Image } from 'react-native';

interface Props {
	places: GooglePlace[];
}

export const MapPoints = (props: Props) => {
	return (
		<React.Fragment>
			{props.places.map((place) => {
				return (
					<Marker
						key={place.id}
						coordinate={{
							longitude: place.geometry.location.lng,
							latitude: place.geometry.location.lat,
						}}
						title={place.name}>
						<Image
							source={require('../../../../../assets/images/carry_out.png')}
							style={{ height: 25, width: 25 }}
							resizeMode='contain'
						/>
					</Marker>
				);
			})}
		</React.Fragment>
	);
};
