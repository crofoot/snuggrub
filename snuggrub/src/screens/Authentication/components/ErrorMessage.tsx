import React from 'react';
import { Caption } from 'react-native-paper';
import { errorColor } from 'theme/colors';

interface ErrorMessageProps {
	error: any;
	property: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
	const { error, property } = props;
	if (error[property]) {
		return <Caption style={{ color: errorColor }}>{error[property].message}</Caption>;
	} else {
		return null;
	}
};
