import { auth, analytics } from 'firebase';
import { User } from 'models/User';
import { UserDao } from 'dao/UserDao';
import { SettingsService } from './SettingsService';

export class UserService {
	static signIn(email: string, password: string): Promise<User> {
		return auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				return {
					displayName: response.user.displayName,
					email: response.user.email,
					isNewUser: response.additionalUserInfo.isNewUser,
				};
			});
	}

	static signInAsGuest(): Promise<User> {
		return auth()
			.signInAnonymously()
			.then((response) => {
				return {
					displayName: response.user.displayName,
					email: response.user.email,
					isNewUser: false,
				};
			});
	}

	static afterSignIn = () => {
		return Promise.all([SettingsService.getSettings()]);
	};

	static async signUp(
		email: string,
		password: string,
		displayName
	): Promise<User> {
		let user: User;

		return auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				user = {
					displayName,
					email: response.user.email,
					isNewUser: response.additionalUserInfo.isNewUser,
				};
				return response.user.updateProfile({ displayName });
			})
			.then(() => user);
	}

	static isAuthenticated(user: User): boolean {
		if (auth().currentUser) {
			if (user !== null) {
				if (!user.isNewUser) {
					return true;
				}
			}
		}
		return false;
	}

	static loadCurrentUser(
		callback: (user: User | null) => void,
		err: () => void
	): void {
		const dao = new UserDao();
		dao.loadUser(callback, err);
	}
}
