import http from "./common";

export class TourService {
  basePath = "/tours";

	create(tourData) {
		return http.post(this.basePath, tourData);
	}

  getTours() {
    return http.get(this.basePath);
  }

  // getTourById(id) {
  //   return http.get(`/tours/${id}`);
  // }

  // getTourByPackageId(packageId) {
  //   return http.get(`/tours/packageid/${packageId}`);
  // }

  getToursByLocationId(locationId) {
    return http.get(this.basePath + `/locationid/${locationId}`);
  }

  // filterTour(travelAgencyId, locationId) {
  //   return http.get(
  //     `/tours/?travelAgencyId=${travelAgencyId}&locationId=${locationId}`
  //   );
  // }
}
