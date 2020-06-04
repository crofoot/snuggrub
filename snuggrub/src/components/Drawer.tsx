import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.imageView}>{/* <Image source={require('../../assets/appLogo.png')} style={styles.logo} /> */}</View>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	imageView: {
		marginVertical: 6,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	logo: {
		width: 24,
		height: 40.5,
	},
});
