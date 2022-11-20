import http from './common';

export class CarService {
  basePath = '/rentcars';

  getCars() {
    return http.get(this.basePath);
  }

  getCarById(id) {
    return http.get(this.basePath + `/${id}`);
  }

  filterCar(priceMin, priceMax, capacityMin, capacityMax, brand) {
    return http.get(this.basePath + `/filters/${priceMin}/${priceMax}/${capacityMin}/${capacityMax}/${brand}`);
  }
}
