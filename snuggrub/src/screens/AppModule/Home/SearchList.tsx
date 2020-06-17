import React from 'react';
import { useLazyPromise, RequestError } from 'react-promise-hooks';
import { SearchService } from 'services/SearchService';
import { GooglePlace } from 'models/GooglePlace';
import { SearchPlaceDto } from 'dto/SearchPlace.dto';
import { View, FlatList, Dimensions, Image } from 'react-native';
import { Loader } from 'components/Loader';
import { Subheading, Card, Caption, useTheme } from 'react-native-paper';
import { LocationData } from 'expo-location';
import * as Animatable from 'react-native-animatable';
import { GOOGLE_API_KEY } from 'utils/apiKey';

interface Props {
	isVisible: boolean;
	searchText: string;
	location: {
		loading: boolean;
		error: RequestError;
		data: LocationData;
		refetch: (promiseParams: any) => Promise<void>;
	};
	selectPlace: (place: GooglePlace) => void;
}

const fadeIn = {
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
};

export const SearchList = (props: Props) => {
	const theme = useTheme();
	const [fetchPlaces, results] = useLazyPromise<GooglePlace[], SearchPlaceDto>(
		SearchService.searchPlaces
	);

	React.useEffect(() => {
		if (props.searchText.length > 3 && props.location.data) {
			fetchPlaces({
				lat: props.location.data.coords.latitude,
				lng: props.location.data.coords.longitude,
				search: props.searchText,
			});
		}
	}, [props.searchText]);

	if (props.isVisible) {
		if (results.loading) {
			return (
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Loader />
				</View>
			);
		}

		if (results.error.occurred) {
			return (
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Subheading>Error Occurred</Subheading>
				</View>
			);
		}

		return (
			<Animatable.View
				style={{
					backgroundColor: theme.colors.background,
					marginTop: 1,
					height: Dimensions.get('screen').height * 0.55,
					borderRadius: 10,
				}}
				animation={fadeIn}
				duration={450}>
				<FlatList
					data={results.data}
					renderItem={({ item, index }) => {
						return (
							<Card
								onPress={() => props.selectPlace(item)}
								style={{
									marginHorizontal: 10,
									marginVertical: 5,
									borderRadius: 10,
								}}>
								<Card.Title title={item.name} />
								<Subheading style={{ paddingHorizontal: 17 }}>
									{item.formatted_address}
								</Subheading>
							</Card>
						);
					}}
				/>
			</Animatable.View>
		);
	}

	return null;
};

const imageUri = (item: GooglePlace) => {
	try {
		return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${200}&photoreference=${
			item.photos[0].photo_reference
		}&key=${GOOGLE_API_KEY}`;
	} catch (error) {
		return undefined;
	}
};
