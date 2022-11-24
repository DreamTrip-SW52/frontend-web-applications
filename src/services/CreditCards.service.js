import http from './common';

export class CreditCardsService {
  travelerPath = '/travelercards';
  agencyPath = '/agencycard';

  getByTravelerId(id) {
    return http.get(this.travelerPath + `/travelerid/${id}`);
  }

  createTravelerCard(card) {
    return http.post(this.travelerPath, JSON.stringify(card));
  }

  updateTravelerCardById(id, travelerCard) {
    return http.put(this.travelerPath + `/${id}`);
  }

  deleteTravelerCard(id) {
    return http.delete(this.travelerPath + `/${id}`);
  }

  getByAgencyId(id) {
    return http.get(this.agencyPath + `/agencyid/${id}`);
  }

  createAgencyCard(card) {
    return http.post(this.agencyPath, JSON.stringify(card));
  }

  updateAgencyCardById(id, agencyCard) {
    return http.put(this.agencyPath + `/${id}`);
  }

  deleteAgencyCard(id) {
    return http.delete(this.agencyPath + `/${id}`);
  }
}
