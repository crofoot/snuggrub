import React from 'react';
import { auth, analytics } from 'firebase';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { primaryColor, errorColor } from 'theme/colors';
import { useNavigation } from '@react-navigation/native';

import { Footer } from './components/Footer';
import { Keyboard, View, Text } from 'react-native';
import { AuthLayout } from './components/AuthLayout';
import { Wander, Flow } from 'react-native-animated-spinkit';
import { SignUpHeader } from './components/SignUpHeader';
import { ShowPassword } from './components/ShowPassword';
import { ErrorMessage } from './components/ErrorMessage';
import { TextInput, Button, Caption } from 'react-native-paper';

import { darkTheme, lightTheme } from 'theme/types';
import { useDispatch } from 'react-redux';
import { secondaryColor } from 'theme/colors';
import { UserService } from 'services/UserService';
import { setUser } from 'actions/user';

const schema = yup.object().shape({
	displayName: yup.string().required('Full Name is required').min(3),
	email: yup.string().required('Email is required').email(),
	password: yup.string().required('Password is required').min(8).max(30),
	confirmPassword: yup
		.string()
		.required('Confirm Password is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignUp = () => {
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
		register('displayName');
		register('confirmPassword');
	}, [register]);

	const handleSignUp = (data) => {
		try {
			Keyboard.dismiss();

			if (isError) {
				setIsError(false);
			}
			setIsAuthenticating(true);

			UserService.signUp(data.email, data.password, data.displayName)
				.then((user) => {
					dispatch(setUser(user));

					if (user.isNewUser) {
						navigation.navigate('Setup');
					}
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
			<SignUpHeader />
			<View style={{ flex: 10 }}>
				<TextInput
					autoCorrect={false}
					label='Full Name'
					theme={{
						...lightTheme,
						colors: {
							error: '#911919',
						},
					}}
					returnKeyType='done'
					autoCapitalize='words'
					keyboardAppearance='dark'
					error={errors.email ? true : false}
					style={{ backgroundColor: secondaryColor }}
					onChangeText={(text) => setValue('displayName', text)}
				/>
				<ErrorMessage error={errors} property='displayName' color='#911919' />
				<TextInput
					autoCorrect={false}
					label='Email'
					theme={{
						...lightTheme,
						colors: {
							error: '#911919',
						},
					}}
					returnKeyType='done'
					autoCapitalize='none'
					keyboardAppearance='dark'
					keyboardType='email-address'
					error={errors.email ? true : false}
					style={{ backgroundColor: secondaryColor }}
					onChangeText={(text) => setValue('email', text)}
				/>
				<ErrorMessage error={errors} property='email' color='#911919' />
				<TextInput
					label='Password'
					theme={{
						...lightTheme,
						colors: {
							error: '#911919',
						},
					}}
					returnKeyType='done'
					autoCapitalize='none'
					keyboardAppearance='dark'
					secureTextEntry={!visiblePassword}
					error={errors.password ? true : false}
					style={{ backgroundColor: secondaryColor }}
					onChangeText={(text) => setValue('password', text)}
				/>
				<ErrorMessage error={errors} property='password' color='#911919' />
				<TextInput
					label='Confirm Password'
					theme={{
						...lightTheme,
						colors: {
							error: '#911919',
						},
					}}
					returnKeyType='done'
					autoCapitalize='none'
					keyboardAppearance='dark'
					secureTextEntry={!visiblePassword}
					error={errors.confirmPassword ? true : false}
					style={{ backgroundColor: secondaryColor }}
					onChangeText={(text) => setValue('confirmPassword', text)}
				/>
				<ErrorMessage
					error={errors}
					property='confirmPassword'
					color='#911919'
				/>
				<ShowPassword
					visible={visiblePassword}
					setVisiblePassword={setVisiblePassword}
				/>
				<Button
					uppercase={false}
					mode='contained'
					onPress={handleSubmit(handleSignUp)}>
					<Text
						style={{
							textAlignVertical: 'center',
							textAlign: 'center',
							fontSize: 22,
						}}>
						Sign Up
					</Text>
				</Button>
			</View>
			<View style={{ flex: 1, alignItems: 'center' }}>
				{isAuthenticating && <Flow color='white' />}
				{isError && (
					<Caption style={{ color: errorColor }}>{errorMessage}</Caption>
				)}
			</View>
			<Footer
				text='Already have an account? Sign In!'
				navigate={() => navigation.navigate('SignIn')}
			/>
		</AuthLayout>
	);
};
