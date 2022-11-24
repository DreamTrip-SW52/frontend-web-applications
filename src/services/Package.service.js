const BASE_URL = "http://localhost:3000/packages?";
import http from "./common";

export class PackageService {
  packagePath = "/package";
  purchasedPackagePath = "/purchasedpackage";
  customPackagePath = "/custompackages";

  getAll() {
    return http.get(this.packagePath);
  }

  createPackage(packageData) {
    return http.post(this.packagePath, JSON.stringify(packageData));
  }

  createCustomPackage(customPackageData) {
    return http.post(this.customPackagePath, customPackageData);
  }

  updatePackage(id, packageData) {
    return http.put(this.packagePath + `/${id}`, packageData);
  }

  getById(id) {
    return http.get(this.packagePath + `/${id}`);
  }

  getByTravelAgencyId(travelAgencyId) {
    return http.get(this.packagePath + `/agencyid/${travelAgencyId}`);
  }

  createPurchasedPackage(purchasedPackageData) {
    return http.post(this.purchasedPackagePath, purchasedPackageData);
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
}
