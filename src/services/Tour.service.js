import http from './common';

export class TourService {
  getTours() {
    return http.get('/tours');
  }

  // getTourById(id) {
  //   return http.get(`/tours/${id}`);
  // }

  getTourByPackageId(packageId) {
    return http.get(`/tours/packageid/${packageId}`);
  }

  filterTour(travelAgencyId, locationId) {
    return http.get(
      `/tours/?travelAgencyId=${travelAgencyId}&locationId=${locationId}`
    );
  }
}
