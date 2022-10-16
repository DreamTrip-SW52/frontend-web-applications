import http from "./common";

export class TransportService {
  getTransports() {
    return http.get("/transports");
  }

  getTransportById(id) {
    return http.get(`/transports/${id}`);
  }

  getTransportByPackageId(packageId) {
    return http.get(`/transports/?packageId=${packageId}`);
  }
}
