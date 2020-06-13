import React from 'react';
import { GooglePlace } from 'models/GooglePlace';
import {
	Surface,
	Headline,
	useTheme,
	Subheading,
	Paragraph,
	Divider,
} from 'react-native-paper';
import { Loader } from 'components/Loader';
import { View, Text, Image } from 'react-native';
import { Stars } from './Stars';
import { PriceRate } from './PriceRate';

interface Props {
	place: GooglePlace;
}

export const SheetPlace = (props: Props) => {
	const theme = useTheme();
	const { place } = props;
	if (place === null) {
		return (
			<View
				style={{ height: '100%', backgroundColor: theme.colors.background }}>
				<Loader />
			</View>
		);
	}

	return (
		<View
			style={{
				height: '100%',
				backgroundColor: theme.colors.background,
			}}>
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
						{place.vicinity}
					</Subheading>
					<Subheading
						style={{
							color: place.opening_hours.open_now ? '#8fbfa2' : '#c27a7a',
							fontFamily: 'OpenSans',
							height: 40,
						}}>
						{place.opening_hours.open_now ? 'Open' : 'Closed'}
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
				}}>
				<Image
					source={require('../../../../../assets/images/dine_out.png')}
					style={{ height: 60, width: 60 }}
					resizeMode='contain'
				/>
				<Image
					source={require('../../../../../assets/images/dine_in_table.png')}
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
		</View>
	);
};
