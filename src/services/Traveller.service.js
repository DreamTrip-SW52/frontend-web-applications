import http from "./common";

export class TravellerService {
  getAll() {
    return http.get("/travellers");
  }
  getById(id) {
    return http.get(`/travellers/${id}`);
  }

  isEmailRepeated(email) {
    return http.get(`/travellers?email=${email}`);
  }

  loginWithEmailAndPassword(email, password) {
    return http.get(`/travellers?email=${email}&password=${password}`);
  }

  create(data) {
    return http.post("/travellers", data);
  }

  update(id, data) {
    return http.put(`/travellers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/travellers/${id}`);
  }
}
