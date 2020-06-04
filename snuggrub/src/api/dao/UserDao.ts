import { auth } from 'firebase';
import { User } from 'models/User';

export class UserDao {
	loadUser(callback: (user: User | null) => void, err: () => void) {
		const unsubscribe = auth().onAuthStateChanged((user) => {
			if (user) {
				callback({
					email: user.email,
					displayName: user.displayName,
					isNewUser: false,
				});
			} else {
				callback(null);
			}
			unsubscribe();
		}, err);
	}
}
