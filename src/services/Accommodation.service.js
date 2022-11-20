import http from './common';

export class AccommodationService {
  basePath = '/accommodation';
  servicesPerAccommodationPath = '/servicesperaccommodations';

  getAccommodations() {
    return http.get(this.basePath);
  }

  getAccommodationByPackageId(id) {
    return http.get(this.basePath + `/packageid/${id}`);
  }

  filterAccommodation(priceMin, priceMax) {
    return http.get(this.basePath + `/filters/${priceMin}/${priceMax}`);
  }

  getServicesPerAccommodation(accommodationId) {
    return http.get(
      this.servicesPerAccommodationPath + `/accommodationId/${accommodationId}`
    );
  }

  getServiceByServiceId(serviceId) {
    return http.get('/services' + `/${serviceId}`);
  }
}
