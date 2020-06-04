import { Settings } from 'models/Settings';
import { SettingsReferences } from '../references/SettingReferences';
import { database } from 'firebase';

export class SettingsDao {
	create(settings: Settings): Promise<any> {
		return database().ref(SettingsReferences.ref()).set(settings);
	}

	update(settings: Settings): Promise<any> {
		return database().ref(SettingsReferences.ref()).set(settings);
	}

	getCurrentUserSettings(): Promise<Settings> {
		return database()
			.ref(SettingsReferences.ref())
			.once('value')
			.then((fbResponse) => {
				return fbResponse.val();
			});
	}
}
