import http from './common';

export class TravelAgencyService {
  agencyPath = '/agencies';

  getAll() {
    return http.get(this.agencyPath);
  }
  getById(id) {
    return http.get(this.agencyPath + `/${id}`);
  }

  // isEmailRepeated(email) {
  //   return http.get(`/travelAgency?email=${email}`);
  // }

  loginWithEmailAndPassword(email, password) {
    return http.get(this.agencyPath + `/emailandpassword/${email}/${password}`);
  }

  create(agency) {
    return http.post(this.agencyPath, agency);
  }

  update(id, agency) {
    return http.put(this.agencyPath + `/${id}`, agency);
  }

  delete(id) {
    return http.delete(this.agencyPath + `/${id}`);
  }
}

