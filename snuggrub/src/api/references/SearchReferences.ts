import { GOOGLE_API_KEY } from 'utils/apiKey';

export class SearchReferences {
	static nearByEndpoint = (lat: number, lng: number) => {
		return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=cruise&key=${GOOGLE_API_KEY}`;
	};
}
