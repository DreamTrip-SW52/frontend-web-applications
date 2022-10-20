import http from './common';

export class AccommodationService {
  getAccommodations() {
    return http.get('/accommodations');
  }

  getAccommodationById(id) {
    return http.get(`/accommodations/${id}`);
  }

  filterAccommodation(prices, travelAgencyId, locationId) {
    const priceMin = prices[0];
    const priceMax = prices[1];

    const URL = `/accommodations?price_gte=${priceMin}&price_lte=${priceMax}&travelAgencyId=${travelAgencyId}&locationId=${locationId}`;

    //ENCODE URL
    const encodedURL = encodeURI(URL);

    return http.get(encodedURL);
  }
}
