import http from './common';

export class TravelerService {
  getAll() {
    return http.get('/travelers');
  }

  getById(id) {
    return http.get(`/travelers/${id}`);
  }

  loginWithEmailAndPassword(email, password) {
    return http.get(`/travelers/emailandpassword/${email}/${password}`);
  }

  create(data) {
    return http.post('/travelers', data);
  }

  update(id, data) {
    const url = `/travelers/${id}`;
    return http.put(url, data);
  }

  delete(id) {
    return http.delete(`/travelers/${id}`);
  }
}
