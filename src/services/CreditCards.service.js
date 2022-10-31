import http from "./common";
export class CreditCardsService {
  baseGet = "/credit-cards";
  getAll() {
    return http.get(this.baseGet);
  }
  getById(id) {
    return http.get(this.baseGet + `/${id}`);
  }

  getByUserId(userId){
    return http.get(this.baseGet + `?userId=${userId}`)
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