import http from "./common";

export class TourService {
  basePath = "/tours";

  create(tourData) {
    return http.post(this.basePath, tourData);
  }

  getTours() {
    return http.get(this.basePath);
  }

  getTourByPackageId(packageId) {
    return http.get(this.basePath + `/packageid/${packageId}`);
  }

  getToursByLocationId(locationId) {
    return http.get(this.basePath + `/locationid/${locationId}`);
  }
}
