import React from 'react';
import { GooglePlace } from 'models/GooglePlace';
import {
	Surface,
	Headline,
	useTheme,
	Subheading,
	Paragraph,
	Divider,
	Title,
	Card,
	Chip,
	Button,
} from 'react-native-paper';
import { Loader } from 'components/Loader';
import {
	View,
	Text,
	Image,
	FlatList,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { Stars } from './Stars';
import { PriceRate } from './PriceRate';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import {
	summarizeText,
	createAudioFile,
	fetchAndPlayAudioFile,
} from 'utils/textToSpeech';

// import { IamAuthenticator } from 'ibm-watson/auth';
// import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';

interface Props {
	place: GooglePlace;
}

export const SheetPlace = (props: Props) => {
	const theme = useTheme();
	const [menuItem, setMenuItem] = React.useState(0);
	const [loadingAudio, setLoadingAudio] = React.useState(false);
	const { place } = props;

	if (place === null) {
		return (
			<View
				style={{ height: '100%', backgroundColor: theme.colors.background }}>
				<Loader />
			</View>
		);
	}

	const onPressAudio = () => {
		Promise.resolve(setLoadingAudio(true))
			.then(handleAudio)
			.catch(() => {
				alert('An error occurred while translating to audio');
			})
			.finally(() => {
				setLoadingAudio(false);
			});
	};

	const handleAudio = async () => {
		const text = summarizeText(
			props.place,
			'Outdoor dining available on patio (Weather permitted) and undertents.',
			'12 tables available.',
			'Max party size of 6.',
			"Call to make reservation as a waitlist may form and opentable won't be updated.",
			'Only one person from table allowed at bar to order at a time.'
		);

		const fileName = await createAudioFile(text);
		if (fileName) {
			await fetchAndPlayAudioFile(fileName);
		} else {
			console.log('error');
		}
	};

	return (
		<View
			style={{
				height: '100%',
				backgroundColor: theme.colors.background,
			}}>
			<Button disabled={loadingAudio} onPress={onPressAudio}>
				<Subheading>
					{loadingAudio ? 'Loading Audio...' : 'Text to Speech'}
				</Subheading>
			</Button>
			<View style={{ paddingLeft: 7 }}>
				<Headline style={{ paddingLeft: 4 }}>{place.name}</Headline>
				<View style={{ flexDirection: 'row', height: 17 }}>
					<Stars rating={place.rating} />
					<Paragraph
						style={{
							fontSize: 15,
							fontFamily: 'RalewayRegular',
							height: 18,
						}}>
						{place.user_ratings_total} Reviews
					</Paragraph>
				</View>
				<View style={{ paddingLeft: 5 }}>
					<View
						style={{
							flexDirection: 'row',
							height: 25,
						}}>
						<PriceRate rate={place.price_level} />
						<Subheading
							style={{
								fontFamily: 'OpenSans',
							}}>
							{place.types[0]}
						</Subheading>
					</View>
					<Subheading style={{ fontFamily: 'OpenSans', height: 21 }}>
						{place.vicinity === undefined
							? place.formatted_address
							: place.vicinity}
					</Subheading>
					<Subheading
						style={{
							color: place.opening_hours.open_now ? '#8fbfa2' : '#c27a7a',
							fontFamily: 'OpenSans',
							height: 40,
						}}>
						{place.opening_hours.open_now ? 'Open' : 'Closed - LIMITED HOURS'}
						<Text style={{ color: '#404040', fontSize: 15 }}> 9am - 4pm</Text>
					</Subheading>
				</View>
			</View>
			<Divider
				style={{
					// backgroundColor: '#9fb5a8',
					backgroundColor: '#c5d9ce',
					marginHorizontal: 15,
					height: 1.2,
				}}
			/>
			<View
				style={{
					flexDirection: 'row',
					paddingTop: 10,
					justifyContent: 'space-around',
					paddingLeft: 8,
					paddingRight: 8,
					paddingBottom: 10,
				}}>
				<Image
					source={require('../../../../../assets/images/dine_out.png')}
					style={{ height: 60, width: 60 }}
					resizeMode='contain'
				/>
				<Image
					source={require('../../../../../assets/images/dine_in_table_inactive.png')}
					style={{ height: 60, width: 60 }}
					resizeMode='contain'
				/>
				<Image
					source={require('../../../../../assets/images/Delivery.png')}
					style={{ height: 60, width: 60 }}
					resizeMode='contain'
				/>
				<Image
					source={require('../../../../../assets/images/carry_out_tab.png')}
					style={{ height: 60, width: 60 }}
					resizeMode='contain'
				/>
			</View>

			<Divider
				style={{
					// backgroundColor: '#9fb5a8',
					backgroundColor: '#c5d9ce',
					marginHorizontal: 15,
					height: 1.2,
				}}
			/>
			<TouchableOpacity></TouchableOpacity>
			<View style={{ flex: 1, marginTop: 6 }}>
				<FlatList
					horizontal
					data={['dine-out', 'dine-in', 'delivery', 'pickup']}
					keyExtractor={(item) => item}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<Chip
							textStyle={{ color: 'black', fontSize: 13 }}
							selectedColor='#9fb5a8'
							onPress={() => setMenuItem(index)}
							mode='outlined'
							style={{
								backgroundColor: menuItem === index ? '#9fb5a8' : 'white',
								marginHorizontal: 10,
								height: 35,
								// width: 90,
								// marginHorizontal: 10,
							}}>
							<Text
								style={{
									color: menuItem === index ? 'white' : theme.colors.text,
								}}>
								{item}
							</Text>
						</Chip>
					)}
				/>
			</View>
			<View style={{ flex: 5, paddingLeft: 10 }}>
				<Menu menuItem={menuItem} />
			</View>
		</View>
	);
};

interface MenuProps {
	menuItem: number;
}
// { menuItem }: { menuItem: number }
const Menu = (props: MenuProps) => {
	const { menuItem } = props;
	switch (props.menuItem) {
		case 0:
			return (
				<SafeAreaView>
					<ScrollView>
						<View
							style={{
								flexDirection: 'row',
								alignSelf: 'center',
							}}>
							<Text style={styles.closedFont}>
								LIMITED MENU AVAILABLE{'\n'}
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Outdoor dining available on patio (Weather permitted) and under
								tents{'\n'}
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>12 tables available{'\n'}</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>Max party size of 6{'\n'}</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Call to make reservation as a waitlist may form and opentable
								won't be updated{'\n'}
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Only one person from table allowed at bar to order at a time(or
								you may order from waiter)
								{'\n'}
							</Text>
						</View>
					</ScrollView>
				</SafeAreaView>
			);
		case 1:
			return (
				<React.Fragment>
					<View
						style={{
							flexDirection: 'row',
							alignSelf: 'center',
						}}>
						<Text style={styles.closedFont}>LIMITED MENU AVAILABLE{'\n'}</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignSelf: 'center',
						}}>
						<Text style={styles.closedFont}>
							INDOOR DINING NOT AVAILABLE{'\n'}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
						<Text style={styles.instructFont}>
							Indoor grocery market open Monday-Friday {'\n'}-open 9 am -
							whenever we go out of stock{'\n'}
						</Text>
					</View>

					<View style={{ flexDirection: 'row' }}>
						<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
						<Text style={styles.instructFont}>
							(Social distance practice and masks required to enter)
						</Text>
					</View>
				</React.Fragment>
			);
		case 2:
			return (
				<SafeAreaView>
					<ScrollView>
						<View
							style={{
								flexDirection: 'row',
								alignSelf: 'center',
							}}>
							<Text style={styles.closedFont}>
								LIMITED MENU AVAILABLE{'\n'}
							</Text>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Order from our limited menu online or over phone {'\n'}
							</Text>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Select "Delivery" Online and enter address + time slot to be
								delivered{'\n'}
							</Text>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Show proof of payment to driver through screen-door and be
								cautious of touching + social distance guidelines
								{'\n'}
							</Text>
						</View>
					</ScrollView>
				</SafeAreaView>
			);
		case 3:
			return (
				<SafeAreaView>
					<ScrollView>
						<View
							style={{
								flexDirection: 'row',
								alignSelf: 'center',
							}}>
							<Text style={styles.closedFont}>
								LIMITED MENU AVAILABLE{'\n'}
							</Text>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Order from our limited menu online or over phone {'\n'}
							</Text>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Select "Pickup" Online and pick a time slot to pick up order
								{'\n'}
							</Text>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								Use side door of building to enter our pick-up area (to the left
								of our main door - follow signs)
								{'\n'}
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Entypo style={{ paddingTop: 4 }} size={10} name='circle' />
							<Text style={styles.instructFont}>
								follow line-seperation markings on ground {'\n'}when waiting for
								pickup inside and outside of building
								{'\n'}
							</Text>
						</View>
					</ScrollView>
				</SafeAreaView>
			);
	}
};

const styles = StyleSheet.create({
	instructFont: {
		paddingLeft: 5,
		fontSize: 16,
		fontFamily: 'RalewayRegular',
	},
	closedFont: {
		color: '#c27a7a',
		paddingLeft: 5,
		fontSize: 16,
		fontFamily: 'RalewayRegular',
	},
});
