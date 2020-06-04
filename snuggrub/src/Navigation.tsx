import React from 'react';

// Drawer

import { CustomDrawerContent } from 'components/Drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';

// Authenication Module
import { SignIn } from './screens/Authentication/SignIn';
import { SignUp } from './screens/Authentication/SignUp';
import { ForgotPassword } from './screens/Authentication/ForgotPassword';

// Setup Screens
import { SetupUser } from './screens/Authentication/Setup/SetupUser';

// App Module
import { HomeScreen } from './screens/AppModule/Home';
import { SettingsScreen } from './screens/AppModule/Settings';

// Models, Hooks, Services
import { User } from 'models/User';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { UserService } from 'services/UserService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const Navigation = () => {
	let theme = useTheme();
	const user: User | null = useSelector(({ user }: any) => user);

	return (
		<NavigationContainer theme={theme.dark ? DarkTheme : DefaultTheme}>
			<Navigator isAuth={UserService.isAuthenticated(user)} />
		</NavigationContainer>
	);
};

const Navigator = ({ isAuth }: { isAuth: boolean }) => {
	if (isAuth) {
		return <ApplicationDrawer />;
	} else {
		return <AuthenticationStack />;
	}
};

const AuthenticationStack = () => {
	return (
		<Stack.Navigator
			initialRouteName='SignIn'
			headerMode='none'
			screenOptions={{
				gestureEnabled: false,
				...TransitionPresets.FadeFromBottomAndroid,
			}}>
			<Stack.Screen name='SignIn' component={SignIn} />
			<Stack.Screen name='SignUp' component={SignUp} />
			<Stack.Screen name='ForgotPassword' component={ForgotPassword} />
			<Stack.Screen name='Setup' component={SetupAccountStack} />
		</Stack.Navigator>
	);
};

const SetupAccountStack = () => {
	return (
		<Stack.Navigator
			initialRouteName='SetupUser'
			headerMode='none'
			screenOptions={{
				gestureEnabled: false,
			}}>
			<Stack.Screen name='SetupUser' component={SetupUser} />
		</Stack.Navigator>
	);
};

const ApplicationDrawer = () => {
	const theme = useTheme();
	return (
		<Drawer.Navigator
			initialRouteName='Home'
			drawerContent={(props) => CustomDrawerContent(props)}
			drawerContentOptions={{
				inactiveBackgroundColor: theme.colors.background,
				inactiveTintColor: theme.colors.text,
				activeBackgroundColor: theme.colors.surface,
				activeTintColor: theme.colors.text,
				labelStyle: {
					fontSize: 20,
				},
			}}
			drawerStyle={{
				backgroundColor: theme.colors.background,
				borderTopRightRadius: 50,
				borderBottomRightRadius: 50,
				paddingRight: 15,
			}}>
			<Drawer.Screen name='Home' component={HomeScreen} />
			<Drawer.Screen name='Settings' component={SettingsScreen} />
		</Drawer.Navigator>
	);
};
