import http from "./common";

export class TravelAgencyService {
  getAll() {
    return http.get("/travelAgency");
  }
  getById(id) {
    return http.get(`/travelAgency/${id}`);
  }

  isEmailRepeated(email) {
    return http.get(`/travelAgency?email=${email}`);
  }

  loginWithEmailAndPassword(email, password) {
    return http.get(`/travelAgency?email=${email}&password=${password}`);
  }

  create(data) {
    return http.post("/travelAgency", data);
  }

  update(id, data) {
    return http.put(`/travelAgency/${id}`, data);
  }

  delete(id) {
    return http.delete(`/travelAgency/${id}`);
  }
}
