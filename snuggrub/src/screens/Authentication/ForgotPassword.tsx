import React from 'react';
import { auth } from 'firebase';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { secondaryColor, errorColor } from 'theme/colors';
import { useNavigation } from '@react-navigation/native';

import { Footer } from './components/Footer';
import { Keyboard, View, Text } from 'react-native';
import { AuthLayout } from './components/AuthLayout';
import { ErrorMessage } from './components/ErrorMessage';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { TextInput, Button, Caption, Headline, Subheading } from 'react-native-paper';

import { Wander } from 'react-native-animated-spinkit';
import { darkTheme } from 'theme/types';

const schema = yup.object().shape({
	email: yup
		.string()
		.required("Please enter your account's email address")
		.email()
});

export const ForgotPassword = () => {
	const navigation = useNavigation();
	const [isError, setIsError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [isAuthenticating, setIsAuthenticating] = React.useState(false);
	const { register, handleSubmit, setValue, errors } = useForm({
		validationSchema: schema
	});

	React.useEffect(() => {
		register('email');
	}, [register]);

	const handleForgotPassword = data => {
		try {
			Keyboard.dismiss();
			if (isError) {
				setIsError(false);
				setErrorMessage('');
			}
			setIsAuthenticating(true);

			auth()
				.sendPasswordResetEmail(data.email, data.password)
				.then(() => setIsModalVisible(true))
				.catch(error => {
					setIsError(true);
					setErrorMessage(error.message);
				})
				.finally(() => {
					setIsAuthenticating(false);
				});
		} catch (error) {}
	};

	const handleCloseModal = () => {
		navigation.navigate('SignIn');
	};

	return (
		<AuthLayout>
			<View style={{ flex: 3, justifyContent: 'center' }}>
				<Headline style={{ fontWeight: '700', color: 'white' }}>Forgot Password?</Headline>
				<Subheading style={{ color: 'gray' }}>
					No problem just provide your account's email and we will send you some help.
				</Subheading>
			</View>
			<View style={{ flex: 4 }}>
				<TextInput
					label='Email'
					theme={darkTheme}
					autoCapitalize='none'
					error={errors.email ? true : false}
					style={{ backgroundColor: secondaryColor }}
					onChangeText={text => setValue('email', text)}
				/>
				<ErrorMessage error={errors} property='email' />
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Button uppercase={false} mode='contained' onPress={handleSubmit(handleForgotPassword)}>
						<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 22 }}>
							Request Reset Password
						</Text>
					</Button>
				</View>
			</View>
			<View style={{ flex: 1, alignItems: 'center' }}>
				{isAuthenticating && <Wander color='white' />}
				{isError && <Caption style={{ color: errorColor }}>{errorMessage}</Caption>}
			</View>
			<Footer text='Sign In' navigate={() => navigation.navigate('SignIn')} />
			<ForgotPasswordModal isVisible={isModalVisible} handleCloseModal={handleCloseModal} />
		</AuthLayout>
	);
};
