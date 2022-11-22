import moment from "moment/moment";
import http from "./common";

export class TransportService {
  roundTripPath = "/roundtrips";
  oneWayPath = "/oneway";
  transportPath = "/transports";
  transportClassPath = "/transportclasses";
  tripsGoPath = "/tripsgo";
  tripsBackPath = "/tripsback";
  locationPath = "/location";

  getRoundTripByPackageId(packageId) {
    return http.get(this.roundTripPath + `/packageid/${packageId}`);
  }

  getOneWayByPackageId(packageId) {
    return http.get(this.oneWayPath + `/packageid/${packageId}`);
  }

  getTransportById(transportId) {
    return http.get(this.transportPath + `/${transportId}`);
  }

  getTransportClassById(transportClassId) {
    return http.get(this.transportClassPath + `/${transportClassId}`);
  }

  getTripGoById(tripGoId) {
    return http.get(this.tripsGoPath + `/${tripGoId}`);
  }

  getTripBackById(tripBackId) {
    return http.get(this.tripsBackPath + `/${tripBackId}`);
  }

  getLocationById(locationId) {
    return http.get(this.locationPath + `/${locationId}`);
  }

  getLocationByDepartment(department) {
    return http.get(this.locationPath + `/department/${department}`);
  }

  getOneWayByFilters(
    to,
    departureDate,
    returnDate,
    transportClass,
    transportType
  ) {
    return http.get(
      this.oneWayPath +
        `/filters/${to}/${departureDate}/${returnDate}/${transportClass}/${transportType}`
    );
  }

  getRoundTripByFilters(
    from,
    to,
    departureDate,
    returnDate,
    transportClass,
    transportType
  ) {
    return http.get(
      this.roundTripPath +
        `/filters/${from}/${to}/${departureDate}/${returnDate}/${transportClass}/${transportType}`
    );
  }

  createTripsGo(tripsGo) {
    return http.post(this.tripsGoPath, tripsGo);
  }

  createTripsBack(tripsBack) {
    return http.post(this.tripsBackPath, tripsBack);
  }

  createTransport(transport) {
    return http.post(this.transportPath, transport);
  }

  createRoundTrip(roundTrip) {
    return http.post(this.roundTripPath, roundTrip);
  }

  createOneWay(oneWay) {
    return http.post(this.oneWayPath, oneWay);
  }

  // getTransportByTypeAndId(type, transportId) {
  //   return http.get(`/${type}/${transportId}`);
  // }

  // getTransportByType(type) {
  //   return http.get(`/${type}`);
  // }
}
