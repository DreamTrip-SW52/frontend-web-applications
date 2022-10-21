import http from './common';

export class CurrentTravelService {
  async getByTravelerId(travelerId) {
    const { data } = await http.get(`/current-travels/?travelerId=${travelerId}`);

    return http.get(`/packages/${data?.[0]?.packageId}`);
  }
}
