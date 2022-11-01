import http from "./common";
export class CreditCardsService {
  baseGet = "/credit_cards";
  getAll() {
    return http.get(this.baseGet);
  }
  getById(id) {
    return http.get(this.baseGet + `/${id}`);
  }
  getByUser(userId, userType){
    return http.get(this.baseGet + `?userId=${userId}&userType=${userType}`)
  }

  create(data) {
    return http.post(this.baseGet, data);
  }

  update(id, data) {
    return http.put(this.baseGet + `/${id}`, data);
  }

  delete(id) {
    return http.delete(this.baseGet +`/${id}`);
  }
}