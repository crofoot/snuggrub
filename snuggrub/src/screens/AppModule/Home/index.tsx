import React from 'react';
import { Title } from 'react-native-paper';
import { Layout } from 'components/Layout';
import { DrawerHeader } from 'components/DrawerHeader';

export const HomeScreen = () => {
	return (
		<Layout>
			<DrawerHeader title='Home' />
		</Layout>
	);
};
