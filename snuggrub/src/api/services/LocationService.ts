import * as Location from 'expo-location';

export class LocationService {
	static async getLocation(): Promise<Location.LocationData> {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== Location.PermissionStatus.GRANTED) {
			throw Error('Could not get location');
		}

		let location = await Location.getCurrentPositionAsync({});
		return location;
	}
}
