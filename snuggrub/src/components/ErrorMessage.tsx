import React from 'react';
import { Caption } from 'react-native-paper';
import { errorColor } from 'theme/colors';

interface ErrorMessageProps {
	error: any;
	property: string;
	centered?: true;
	overrideMessage?: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
	const { error, property } = props;
	if (error[property]) {
		return (
			<Caption style={{ color: errorColor, textAlign: props.centered ? 'center' : 'auto' }}>
				{props.overrideMessage ? props.overrideMessage : error[property].message}
			</Caption>
		);
	} else {
		return null;
	}
};
