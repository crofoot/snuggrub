import React from 'react';

// utils models
import { GooglePlace } from 'models/GooglePlace';
import { RequestError } from 'react-promise-hooks';

// components
import { CardItem } from './CardItem';
import BottomSheet from 'reanimated-bottom-sheet';
import { FlatList, Dimensions } from 'react-native';
import { LocationData } from 'expo-location';
import { Loader } from 'components/Loader';
import { Title, Button, Surface, useTheme, Headline } from 'react-native-paper';
import { Layout } from 'components/Layout';
import { BottomSheetHeader } from 'components/BottomSheet';
import { SheetPlace } from './SheetPlace';

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

interface ModalState {
	isVisible: boolean;
	currentPlace: GooglePlace | null;
}

export const GooglePlaceList = (props: Props) => {
	const theme = useTheme();
	const flatListRef = React.useRef(null);
	const sheetRef = React.useRef<any>(null);
	const [bottomPlace, setBottomPlace] = React.useState<GooglePlace | null>(
		null
	);
	const [currentPlace, setCurrentPlace] = React.useState(null);

	React.useEffect(() => {
		if (props.placeResults.data) {
			if (props.selectedPlaceId !== null) {
				let index = props.placeResults.data.findIndex(
					(p) => p.id === props.selectedPlaceId
				);
				flatListRef.current.scrollToIndex({ index });
			}
			setCurrentPlace(props.selectedPlaceId);
		}
	}, [props.selectedPlaceId]);

	const openSheet = (place: GooglePlace) => {
		sheetRef.current.snapTo(1);
		sheetRef.current.snapTo(1);
		setBottomPlace(place);
	};

	// const closeSheet = () => {
	// 	sheetRef.current.snapTo(0);
	// 	sheetRef.current.snapTo(0);
	// 	setBottomPlace(null);
	// };

	if (props.placeResults.loading) {
		return <Loader />;
	}

	return (
		<React.Fragment>
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
							onFocus={() => openSheet(item)}
						/>
					);
				}}
			/>
			<BottomSheet
				ref={sheetRef}
				initialSnap={0}
				renderHeader={() => <BottomSheetHeader theme={theme} />}
				snapPoints={[0, '70%']}
				renderContent={() => <SheetPlace place={bottomPlace} />}
			/>
			{/* <
				isVisible={modal.isVisible}
				style={{
					// height: Dimensions.get('screen').height,
					// width: Dimensions.get('screen').width,
					flex: 1,
					margin: 0,
				}}
				animationIn='slideInUp'
				animationOut='slideOutDown'>
				<Layout>
					<Button
						onPress={() => {
							setModal({
								isVisible: false,
								currentPlace: null,
							});
						}}>
						close
					</Button>
					<Title>Here</Title>
				</Layout>
			</Modal> */}
		</React.Fragment>
	);
};
