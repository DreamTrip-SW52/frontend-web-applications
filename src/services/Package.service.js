const BASE_URL = "http://localhost:3000/packages?";
import http from "./common";

export class PackageService {
  getPackages() {
    return http.get("/packages");
  }

  filterPackage(
    total_lte = null,
    duration_lte = null,
    typeoftour = null,
    typeofpackage = null
  ) {
    let url = BASE_URL;

    if (total_lte) {
      url = url + `&total_lte=${total_lte}`;
    }

    if (duration_lte) {
      url = url + `&duration_lte=${duration_lte}`;
    }

    if (typeoftour) {
      url = url + `&typeOfTour=${typeoftour}`;
    }

    if (typeofpackage) {
      url = url + `&typeOfPackage=${typeofpackage}`;
    }

    const encodedURL = encodeURI(url);
    //const response = await fetch(url);
    //const packagesData = await response.json();
    //return packagesData;
    console.log(encodedURL);
    return http.get(encodedURL);
  }

  // http://localhost:3000/packages?total_lte={insertar_valor_variable_aqui}
  getPackageById(id) {
    return http.get(`/packages/${id}`);
  }

  getPackageByTravelAgencyId(travelAgencyId) {
    return http.get(`/packages/?travelAgencyId=${travelAgencyId}`);
  }

  increaseViewsById(travelAgencyId, Nviews) {
    return http.patch(`/packages/${travelAgencyId}`, {
      views: Nviews,
    });
  }
}
