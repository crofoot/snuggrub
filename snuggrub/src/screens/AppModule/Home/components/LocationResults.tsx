import React from 'react';

// models
import { LocationData } from 'expo-location';
import { GooglePlace } from 'models/GooglePlace';
import { Coordinates } from 'models/Coordinates';
import { SearchService } from 'services/SearchService';
import { SearchResturantDto } from 'dto/SearchResturant.dto';
import { RequestError, useLazyPromise } from 'react-promise-hooks';

// components
import { View } from 'react-native';
import { Loader } from 'components/Loader';
import { GooglePlaceList } from './GooglePlaceList';
import { Button, Surface, Headline, Subheading, useTheme } from 'react-native-paper';

interface Props {
	locationResults: {
		loading: boolean;
		error: RequestError;
		data: LocationData;
		refetch: (promiseParams: any) => Promise<void>;
	};
	setPlaces: (places: GooglePlace[]) => void;
}

export const LocationResults = (props: Props) => {
	const theme = useTheme();
	const [nearbyFetch, nearbyResults] = useLazyPromise<GooglePlace[], SearchResturantDto>(SearchService.getNearByPlaces);

	const handleFetch = () => {
		nearbyFetch({
			lat: props.locationResults.data.coords.latitude,
			lng: props.locationResults.data.coords.longitude,
		});
	};

	React.useEffect(() => {
		if (nearbyResults.done) {
			props.setPlaces(nearbyResults.data);
		}
	}, [nearbyResults.done]);

	if (props.locationResults.loading)
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Loader />
			</View>
		);

	return (
		<Surface style={{ height: '100%' }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
				<Button uppercase={false} mode='contained' onPress={handleFetch}>
					<Subheading>Nearby</Subheading>
				</Button>
				<Button uppercase={false} mode='contained' color={theme.colors.onSurface} onPress={handleFetch}>
					<Subheading>ReLocate</Subheading>
				</Button>
				<Button uppercase={false} mode='contained' color={theme.colors.onSurface} onPress={handleFetch}>
					<Subheading>Nearby</Subheading>
				</Button>
			</View>
			<GooglePlaceList placeResults={nearbyResults} />
		</Surface>
	);
};
