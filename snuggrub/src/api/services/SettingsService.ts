import { Settings } from 'models/Settings';
import { SettingsDao } from 'dao/SettingsDao';

export class SettingsService {
	static createSettings(settings: Settings): Promise<void> {
		const dao = new SettingsDao();
		return dao.create(settings);
	}

	static updateSettings(settings: Settings): Promise<void> {
		const dao = new SettingsDao();
		return dao.update(settings);
	}

	static getSettings(): Promise<Settings> {
		const dao = new SettingsDao();
		return dao.getCurrentUserSettings();
	}
}
