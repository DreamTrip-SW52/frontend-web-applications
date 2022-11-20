import moment from 'moment/moment';
import http from './common';

export class TransportService {
  roundTripPath = '/roundtrips';
  oneWayPath = '/oneway';
  transportPath = '/transports';
  transportClassPath = '/transportclasses';
  tripsGoPath = '/tripsgo';
  tripsBackPath = '/tripsback';
  locationPath = '/location';

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

  // getTransportByTypeAndId(type, transportId) {
  //   return http.get(`/${type}/${transportId}`);
  // }

  // getTransportByType(type) {
  //   return http.get(`/${type}`);
  // }

  // filterTransport(typeOfTransport, typeOfTrip, classT, date) {

  //   const departDate = moment(date[0]).format('DD/MM/YYYY');
  //   const returnDate = moment(date[1]).format('DD/MM/YYYY');

  //   const URL = `/${typeOfTransport}?typeOfTrip=${typeOfTrip}&class=${classT}&departDate_gte=${departDate}&returnDate_lte=${returnDate}`;

  //   //ENCODE URL
  //   const encodedURL = encodeURI(URL);

  //   return http.get(encodedURL);
  // }
}
