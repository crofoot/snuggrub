import React from 'react';
import { Caption, useTheme } from 'react-native-paper';
import { TextInput, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Props {
	value: string;
	maxLength: number;
	onChangeText: (text: string) => void;
	placeholder?: string;
	style?: StyleProp<ViewStyle>;
	textStyles?: StyleProp<TextStyle>;
}

export const Textarea = (props: Props) => {
	const theme = useTheme();

	const Counter = () => {
		return (
			<Caption
				style={{
					position: 'absolute',
					bottom: 8,
					right: 10,
					fontSize: 14,
					color: props.value.length === props.maxLength ? theme.colors.primary : theme.colors.accent,
				}}>{`${props.value.length}/${props.maxLength}`}</Caption>
		);
	};

	return (
		<View style={[styles.textareaView, { backgroundColor: theme.colors.surface }, props.style]}>
			<TextInput
				multiline
				numberOfLines={10}
				value={props.value}
				maxLength={props.maxLength}
				onChangeText={props.onChangeText}
				selectionColor={theme.colors.text}
				placeholder={props.placeholder}
				placeholderTextColor={theme.colors.accent}
				style={[styles.textInput, { color: theme.colors.text, fontFamily: theme.fonts.medium.fontFamily }, props.textStyles]}
			/>
			<Counter />
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		height: 200,
		textAlignVertical: 'top',
		justifyContent: 'flex-start',
	},
	textareaView: {
		padding: 5,
		borderRadius: 10,
	},
});
