import React from 'react';

// utils, hooks
import { LocationData } from 'expo-location';
import { GooglePlace } from 'models/GooglePlace';
import { Coordinates } from 'models/Coordinates';
import { usePromise } from 'react-promise-hooks';
import { LocationService } from 'services/LocationService';
import { useNavigation, DrawerActions } from '@react-navigation/native';

// components
import MapView from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import { MapPoints } from './components/MapPoints';
import { SearchModal } from './components/SearchModal';
import { Surface, Searchbar } from 'react-native-paper';
import { BottomSheetHeader } from 'components/BottomSheet';
import { LocationResults } from './components/LocationResults';
import { SafeAreaView, StyleSheet, Keyboard } from 'react-native';

export const HomeScreen = () => {
	// Screen State
	const [search, setSearch] = React.useState('');
	const [places, setPlaces] = React.useState<GooglePlace[]>([]);
	//const [coordinates, setCoordinates] = React.useState<Coordinates>();
	const [isSearchModalVisible, setIsSearchModalVisible] = React.useState(false);

	const sheetRef = React.useRef();
	const searchRef = React.useRef();
	const navigation = useNavigation();
	const locationResults = usePromise<LocationData>(LocationService.getLocation);

	// React.useEffect(() => {
	// 	if (!locationResults.loading) {
	// 		if (!locationResults.error.occurred && locationResults.data) {
	// 			setCoordinates({
	// 				latitude: locationResults.data.coords.latitude,
	// 				longitude: locationResults.data.coords.longitude,
	// 			});
	// 		}
	// 	}
	// }, [locationResults]);

	const openSearchModal = () => {
		setIsSearchModalVisible(true);
	};

	const closeSearchModal = () => {
		Keyboard.dismiss();
		setIsSearchModalVisible(false);
	};

	const openDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	const region = () => {
		if (locationResults.data) {
			return {
				latitude: locationResults.data.coords.latitude,
				longitude: locationResults.data.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			};
		}
	};
	return (
		<React.Fragment>
			<Surface style={styles.surface}>
				<MapView style={StyleSheet.absoluteFillObject} initialRegion={region()}>
					<MapPoints places={places} />
				</MapView>
				<SafeAreaView>
					<Searchbar
						icon='menu'
						value={search}
						ref={searchRef}
						placeholder='Search'
						style={styles.searchbar}
						onIconPress={openDrawer}
						onChangeText={setSearch}
						// onFocus={openSearchModal}
					/>
				</SafeAreaView>
			</Surface>
			<SearchModal visible={isSearchModalVisible} onClose={closeSearchModal} />
			<BottomSheet
				ref={sheetRef}
				initialSnap={0}
				renderHeader={BottomSheetHeader}
				snapPoints={['20%', '50%', '90%']}
				renderContent={() => <LocationResults locationResults={locationResults} setPlaces={setPlaces} />}
			/>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	surface: {
		flex: 1,
	},
	searchbar: {
		marginHorizontal: 3,
	},
});
