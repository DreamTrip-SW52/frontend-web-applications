import http from "./common";

export class PackageService {
  getPackages() {
    return http.get("/packages");
  }

  getPackageById(id) {
    return http.get(`/packages/${id}`);
  }

  getPackageByTravelAgencyId(travelAgencyId) {
    return http.get(`/packages/?travelAgencyId=${travelAgencyId}`);
  }
}
