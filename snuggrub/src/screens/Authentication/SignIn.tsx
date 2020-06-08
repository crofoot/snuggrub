import React from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { secondaryColor, errorColor } from 'theme/colors';
import { useNavigation } from '@react-navigation/native';

import { Footer } from './components/Footer';
import { Keyboard, View, Text } from 'react-native';
import { AuthLayout } from './components/AuthLayout';
import { Wander } from 'react-native-animated-spinkit';
import { SignInHeader } from './components/SignInHeader';
import { ShowPassword } from './components/ShowPassword';
import { ErrorMessage } from './components/ErrorMessage';
import { TextInput, Button, Caption } from 'react-native-paper';
import { ForgotPasswordLink } from './components/ForgotPasswordLink';

import { darkTheme } from 'theme/types';
import { useDispatch } from 'react-redux';
import { setUser } from 'actions/user';
import { UserService } from 'services/UserService';
import { setSettings } from 'actions/settings';

const schema = yup.object().shape({
	email: yup.string().required('Email is required').email(),
	password: yup.string().required('Password is required').min(8).max(30),
});

export const SignIn = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [visiblePassword, setVisiblePassword] = React.useState(false);
	const [isAuthenticating, setIsAuthenticating] = React.useState(false);
	const { register, handleSubmit, setValue, errors } = useForm({
		validationSchema: schema,
	});

	React.useEffect(() => {
		register('email');
		register('password');
	}, [register]);

	const handleSignIn = (data) => {
		try {
			Keyboard.dismiss();
			if (isError) {
				setIsError(false);
				setErrorMessage('');
			}
			setIsAuthenticating(true);

			UserService.signIn(data.email, data.password)
				.then(async (user) => {
					const signInData = await UserService.afterSignIn();
					await Promise.all([dispatch(setSettings(signInData[0]))]);
					dispatch(setUser(user));
				})
				.catch((error) => {
					setIsError(true);
					setErrorMessage(error.message);
					setIsAuthenticating(false);
				});
		} catch (error) {
			setIsError(true);
			setErrorMessage('An Error Occurred');
			setIsAuthenticating(false);
		}
	};

	return (
		<AuthLayout>
			<SignInHeader />
			
			<View style={{ flex: 4 }}>
				<TextInput
					label='Email'
					theme={darkTheme}
					returnKeyType='done'
					autoCapitalize='none'
					keyboardAppearance='dark'
					keyboardType='email-address'
					error={errors.email ? true : false}
					style={{ backgroundColor: secondaryColor }}
					onChangeText={(text) => setValue('email', text)}
				/>
				<ErrorMessage error={errors} property='email' />
				<TextInput
					label='Password'
					theme={darkTheme}
					autoCapitalize='none'
					returnKeyType='done'
					keyboardAppearance='dark'
					secureTextEntry={!visiblePassword}
					error={errors.password ? true : false}
					style={{ backgroundColor: secondaryColor, color: 'white' }}
					onChangeText={(text) => setValue('password', text)}
				/>
				<ErrorMessage error={errors} property='password' />
				<ShowPassword visible={visiblePassword} setVisiblePassword={setVisiblePassword} />
				<Button uppercase={false} mode='contained' onPress={handleSubmit(handleSignIn)}>
					<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 22 }}>Sign In</Text>
				</Button>
				<ForgotPasswordLink navigate={() => navigation.navigate('ForgotPassword')} />
			</View>
			<View style={{ flex: 1, alignItems: 'center' }}>
				{isAuthenticating && <Wander color='white' />}
				{isError && <Caption style={{ color: errorColor }}>{errorMessage}</Caption>}
			</View>
			<Footer text="Don't have an account? Sign Up!" navigate={() => navigation.navigate('SignUp')} />
		</AuthLayout>
	);
};
