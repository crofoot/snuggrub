import { GooglePlace } from 'models/GooglePlace';
import { SearchReferences } from '../references/SearchReferences';
import { SearchResturantDto } from '../dto/SearchResturant.dto';

export class SearchService {
	static async getNearByPlaces(
		searchDto: SearchResturantDto
	): Promise<GooglePlace[]> {
		const response = await fetch(
			SearchReferences.nearByEndpoint(searchDto.lat, searchDto.lng)
		);
		const parsedResturants = await response.json();
		return parsedResturants.results;
	}
}
