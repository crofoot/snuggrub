import React from 'react';
import { auth } from 'firebase';
import { List, IconButton } from 'react-native-paper';
import { Alert } from 'react-native';

export const UserInformation = () => {
	// const [updateScreen, setUpdateScreen] = React.useState(false);

	// const changeName = (name: string) => {
	// 	auth()
	// 		.currentUser.updateProfile({
	// 			displayName: name,
	// 		})
	// 		.then(() => {
	// 			setUpdateScreen(!updateScreen);
	// 		});
	// };

	// const handleChangeName = () => {
	// 	Alert.prompt(
	// 		'Edit Name',
	// 		'',
	// 		[
	// 			{
	// 				text: 'Cancel',
	// 				onPress: () => {},
	// 				style: 'cancel',
	// 			},
	// 			{ text: 'Ok', onPress: changeName },
	// 		],
	// 		'plain-text',
	// 		auth().currentUser.displayName
	// 	);
	// };

	return (
		<React.Fragment>
			<List.Section>
				<List.Subheader style={{ fontSize: 16 }}>User Information</List.Subheader>
				<List.Item
					title={auth().currentUser.displayName}
					left={(props) => <List.Icon {...props} icon='account' />}
					//	right={(props) => <IconButton size={24} {...props} icon='pencil-outline' onPress={handleChangeName} />}
				/>
				<List.Item title={auth().currentUser.email} left={(props) => <List.Icon {...props} icon='email' />} />
			</List.Section>
		</React.Fragment>
	);
};
