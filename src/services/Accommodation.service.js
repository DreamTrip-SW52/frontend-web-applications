import http from "./common";

export class AccommodationService {
  getAccommodations() {
    return http.get("/accommodations");
  }

  getAccommodationById(id) {
    return http.get(`/accommodations/${id}`);
  }
}
