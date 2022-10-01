import http from './common';

export class UsersApiService {
  getAll() {
    return http.get('/users');
  }
  getById(id) {
    return http.get(`/users/${id}`);
  }

	isEmailRepeated(email) {
		return http.get(`/users?email=${email}`);
	}

  loginWithEmailAndPassword(email, password) {
    return http.get(`/users?email=${email}&password=${password}`);
  }

  create(data) {
    return http.post('/users', data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}
