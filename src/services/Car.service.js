import http from './common';

export class CarService {
  getCars() {
    return http.get('/cars');
  }

  getCarById(id) {
    return http.get(`/cars/${id}`);
  }

  filterCar(travelAgencyId, locationId) {
    return http.get(`/cars?travelAgencyId=${travelAgencyId}&locationId=${locationId}`);
  }

  // filterCar(prices, brand, capacity, travelAgencyId, locationId) {
  // 	const capacityMin = capacity[0];
  // 	const capacityMax = capacity[1];

  //   const priceMin = prices[0];
  //   const priceMax = prices[1];

  //   const URL = `/cars?brand=${brand}&capacity_gte=${capacityMin}&capacity_lte=${capacityMax}&price_gte=${priceMin}&price_lte=${priceMax}`;

  //   //ENCODE URL
  //   const encodedURL = encodeURI(URL);

  //   return http.get(encodedURL);
  // }
}
