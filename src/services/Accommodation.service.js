import http from "./common";

export class AccommodationService {
  getAccommodations() {
    return http.get("/accommodations");
  }

  getAccommodationById(id) {
    return http.get(`/accommodations/${id}`);
  }

  getAccommodationByPackageId(packageId) {
    return http.get(`/accommodations/?packageId=${packageId}`);
  }
}
