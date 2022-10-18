import http from "./common";

export class TransportService {
  getTransports() {
    return http.get("/transports");
  }

  getTransportById(id) {
    return http.get(`/transports/${id}`);
  }

  getTransportByPackageTypeAndId(type,transportId) {
    return http.get(`/${type}/${transportId}`);
  }
}
