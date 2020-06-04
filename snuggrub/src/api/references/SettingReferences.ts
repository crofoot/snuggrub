import { auth } from 'firebase';

export class SettingsReferences {
	private static collectionName = 'settings';

	static ref(): string {
		return `${this.collectionName}/${auth().currentUser.uid}`;
	}
}
