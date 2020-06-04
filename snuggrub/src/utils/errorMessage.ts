enum ErrorType {
	Network,
	Form,
}

type ErrorMessage = {
	type: number;
	message: string;
};

export const ErrorStatus: { [key: string]: ErrorMessage } = {
	0: {
		type: ErrorType.Network,
		message: "We're having network issues right now",
	},
	1: {
		type: ErrorType.Network,
		message: 'We are unable to push up your data',
	},
	2: {
		type: ErrorType.Network,
		message: 'We could fetch your data for you',
	},
	3: {
		type: ErrorType.Form,
		message: '',
	},
};

// key
// 0 : Generic Network Error
// 1 : Could not post data
// 2 : Could not fetch data
// 3 :
