import React from 'react';
import { secondaryColor } from 'theme/colors';
import { View, Dimensions, SafeAreaView, Keyboard } from 'react-native';

interface Props {
	children: React.ReactNode;
}

export const AuthLayout = (props: Props) => {
	return (
		<View style={{ flex: 1, backgroundColor: secondaryColor }}>
			<SafeAreaView
				onTouchMove={Keyboard.dismiss}
				accessible={true}
				style={{
					flex: 1,
					justifyContent: 'center',
					marginHorizontal: Dimensions.get('window').width * 0.05,
					backgroundColor: secondaryColor,
				}}>
				{props.children}
			</SafeAreaView>
		</View>
	);
};
