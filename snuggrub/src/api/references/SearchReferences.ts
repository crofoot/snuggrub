import { GOOGLE_API_KEY } from 'utils/apiKey';
import { SearchPlaceDto } from 'dto/SearchPlace.dto';

export class SearchReferences {
	static nearByEndpoint = (lat: number, lng: number) => {
		return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`;
	};

	static searchPlaces = (dto: SearchPlaceDto) => {
		const searchText = dto.search.replace(/ /g, '+');
		return `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${dto.lat},${dto.lng}&query=${searchText}&type=restaurant&key=${GOOGLE_API_KEY}`;
	};
}
