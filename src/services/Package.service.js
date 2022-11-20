const BASE_URL = 'http://localhost:3000/packages?';
import http from './common';

export class PackageService {
  packagePath = '/package';

  getAll() {
    return http.get(this.packagePath);
  }

  // filterPackage(
  //   total_lte = null,
  //   duration_lte = null,
  //   typeofpackage = null
  // ) {
  //   let url = BASE_URL;

  //   if (total_lte) {
  //     url = url + `&total_lte=${total_lte}`;
  //   }

  //   if (duration_lte) {
  //     url = url + `&duration_lte=${duration_lte}`;
  //   }

  //   if (typeofpackage) {
  //     url = url + `&typeOfPackage=${typeofpackage}`;
  //   }

  //   const encodedURL = encodeURI(url);
  //   console.log(encodedURL);
  //   return http.get(encodedURL);
  // }

  getById(id) {
    return http.get(this.packagePath + `/${id}`);
  }

  getByTravelAgencyId(travelAgencyId) {
    return http.get(this.packagePath + `/agencyid/${travelAgencyId}`);
  }

  // increaseViewsById(travelAgencyId, Nviews) {
  //   return http.patch(`/package/${travelAgencyId}`, {
  //     views: Nviews,
  //   });
  // }

  // increaseSalesById(travelAgencyId, Nsales) {
  //   return http.patch(`/package/${travelAgencyId}`, {
  //     sales: Nsales,
  //   });
  // }
}
