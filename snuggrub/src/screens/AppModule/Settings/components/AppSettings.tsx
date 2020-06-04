import React from 'react';

import { List, Switch } from 'react-native-paper';

interface Props {
	isDarkMode: boolean;
	handleThemeChange: () => Promise<void>;
}

export const AppSettingsInformation = (props: Props) => {
	return (
		<React.Fragment>
			<List.Section>
				<List.Subheader style={{ fontSize: 16 }}>App Settings</List.Subheader>
				<List.Item
					title='Dark Mode'
					left={(props) => <List.Icon {...props} icon='theme-light-dark' />}
					right={() => <Switch value={props.isDarkMode} onValueChange={() => props.handleThemeChange()} />}
				/>
			</List.Section>
		</React.Fragment>
	);
};
