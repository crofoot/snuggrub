import React from 'react';
import StarRating from 'react-native-star-rating';
import { useTheme } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';

export const Stars = ({ rating }: { rating: number }) => {
	const theme = useTheme();

	return (
		<View>
			<StarRating
				containerStyle={styles.starView}
				disabled={true}
				emptyStar={'ios-heart-empty'}
				fullStar={'ios-heart'}
				halfStar={'ios-heart-half'}
				iconSet={'Ionicons'}
				maxStars={5}
				rating={rating}
				starSize={20}
				fullStarColor={'#9fb5a8'}
				// selectedStar={(rating) => this.onStarRatingPress(rating)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	starView: {
		width: Dimensions.get('screen').width * 0.3,
		alignItems: 'flex-start',
		justifyContent: 'space-evenly',
	},
});
