import { Theme, DefaultTheme, DarkTheme } from 'react-native-paper';
import { primaryColor, secondaryColor, darkSecondaryColor, errorColor } from './colors';

export const lightTheme: Theme = {
	dark: false,
	mode: DefaultTheme.mode,
	animation: DefaultTheme.animation,
	colors: {
		text: '#363636', // dark gray
		error: errorColor, // pale red
		primary: primaryColor, // green
		accent: secondaryColor, // dark gray blue
		backdrop: '#3b3b3b', // gray
		disabled: '#757575', // gray
		placeholder: '#6b6b6b', // gray
		notification: '#707680', // blackish blue
		surface: '#fafafa', // white
		onSurface: '#dedede', // light gray
		background: '#fff', // grayish blue
		onBackground: '#f5f5f5', // grayish blue
	},
	fonts: DefaultTheme.fonts,
	roundness: 4,
};

export const darkTheme: Theme = {
	dark: true,
	mode: DarkTheme.mode,
	animation: DarkTheme.animation,
	colors: {
		text: '#fafafa',
		error: errorColor,
		primary: primaryColor,
		accent: darkSecondaryColor,
		backdrop: '#383838',
		disabled: '#757575',
		placeholder: '#a6a6a6',
		notification: '#1f2124',
		surface: '#0e0e0f',
		onSurface: '#262626',
		background: '#17181a',
		onBackground: '#1f1f1f',
	},
	fonts: DarkTheme.fonts,
	roundness: 4,
};

// text: text
// error: error text
// primary: button color
// accent: switch on color
// backdrop: not sure
// disabled: disabled text
// placeholder: input placeholder text
// notification: badge color
// surface: Surface (component)
// onSurface: highlight color on drawer item
// background: View (component if you set it)
// onBackground: not sure
