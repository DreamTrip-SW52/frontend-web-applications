import moment from 'moment/moment';
import http from './common';

export class TransportService {
  getTransportByTypeAndId(type, transportId) {
    return http.get(`/${type}/${transportId}`);
  }

  getTransportByType(type) {
    return http.get(`/${type}`);
  }

  filterTransport(typeOfTransport, typeOfTrip, classT, date) {

    const departDate = moment(date[0]).format('DD/MM/YYYY');
    const returnDate = moment(date[1]).format('DD/MM/YYYY');

    const URL = `/${typeOfTransport}?typeOfTrip=${typeOfTrip}&class=${classT}&departDate_gte=${departDate}&returnDate_lte=${returnDate}`;

    //ENCODE URL
    const encodedURL = encodeURI(URL);

    return http.get(encodedURL);
  }
}
