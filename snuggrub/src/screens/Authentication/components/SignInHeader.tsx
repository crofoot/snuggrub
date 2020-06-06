import React from 'react';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';


export const SignInHeader = () => {
	return (
		<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
			<Title style={{
				color : 'white',
				fontFamily : 'PlayfairDisplay',
				fontSize : 40,
				paddingTop: 10,
			}}>SnugGrub</Title>
			{/* <Image
				source={require('../../../../assets/appLogo.png')}
				style={{
					width: 72,
					height: 122
				}}
			/> */}
		</View>
	);
};
