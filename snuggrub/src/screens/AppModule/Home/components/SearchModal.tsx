import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Layout } from 'components/Layout';

interface Props {
	visible: boolean;
	onClose: () => void;
}
export const SearchModal = (props: Props) => {
	let navigation = useNavigation();
	const [search, setSearch] = React.useState('');

	const openDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	return (
		<Modal isVisible={props.visible} animationIn='fadeIn' animationOut='fadeOut' style={style.modal}>
			<Layout>
				<Searchbar
					icon='menu'
					value={search}
					placeholder='Search'
					style={style.searchbar}
					onIconPress={openDrawer}
					onChangeText={setSearch}
					autoFocus={props.visible}
				/>
				<Button onPress={props.onClose}>Close</Button>
			</Layout>
		</Modal>
	);
};

const style = StyleSheet.create({
	modal: {
		margin: 0,
	},
	searchbar: {
		marginHorizontal: 3,
	},
});
