import React from 'react';

// utils models
import { GooglePlace } from 'models/GooglePlace';
import { RequestError } from 'react-promise-hooks';

// components
import { CardItem } from './CardItem';
import { FlatList } from 'react-native';
import { Title } from 'react-native-paper';
import { LocationData } from 'expo-location';
import { Loader } from 'components/Loader';

interface Props {
	selectedPlaceId: string;
	location: LocationData;
	placeResults: {
		loading: boolean;
		done: boolean;
		error: RequestError;
		data: GooglePlace[];
	};
}
export const GooglePlaceList = (props: Props) => {
	const flatListRef = React.useRef(null);
	const [currentPlace, setCurrentPlace] = React.useState(null);

	React.useEffect(() => {
		if (props.placeResults.data) {
			let index = props.placeResults.data.findIndex(
				(p) => p.id === props.selectedPlaceId
			);
			flatListRef.current.scrollToIndex({ index });
			setCurrentPlace(props.selectedPlaceId);
		}
	}, [props.selectedPlaceId]);

	if (props.placeResults.loading) {
		return <Loader />;
	}

	return (
		<FlatList
			ref={flatListRef}
			style={{ position: 'absolute', bottom: 50 }}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={props.placeResults.data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				return (
					<CardItem
						item={item}
						location={props.location}
						isFocused={currentPlace === item.id}
						onFocus={() => setCurrentPlace(item.id)}
					/>
				);
			}}
		/>
	);
};
