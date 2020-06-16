import { GooglePlace } from 'models/GooglePlace';
import { SearchReferences } from '../references/SearchReferences';
import { SearchResturantDto } from '../dto/SearchResturant.dto';
import { SearchPlaceDto } from '../dto/SearchPlace.dto';

export class SearchService {
	static async getNearByPlaces(
		searchDto: SearchResturantDto
	): Promise<GooglePlace[]> {
		if (searchDto.lat === null && searchDto.lng === null) {
			throw Error('no location');
		}
		const response = await fetch(
			SearchReferences.nearByEndpoint(searchDto.lat, searchDto.lng)
		);
		const parsedResturants = await response.json();
		return parsedResturants.results;
	}

	static async searchPlaces(
		searchPlaceDto: SearchPlaceDto
	): Promise<GooglePlace[]> {
		const response = await fetch(SearchReferences.searchPlaces(searchPlaceDto));
		const parsed = await response.json();
		return parsed.results;
	}
}
