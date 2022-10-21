import http from './common';

export class CurrentTravelService {
  async getCurrentTravel(travelerId) {
    const response = await http.get(`/current-travels/?travelerId=${travelerId}`);

    return response?.data?.[0];
  }

  async getByTravelerId(travelerId) {
    const currentTravel = await this.getCurrentTravel(travelerId);

    return http.get(`/packages/${currentTravel?.packageId}`);
  }

  async createNewBill(travelerId, newBill) {
    const currentTravel = await this.getCurrentTravel(travelerId);
    currentTravel?.new_bills?.push({
      ...newBill,
      id: currentTravel?.new_bills?.length + 1,
    });

    await http.put(`/current-travels/${currentTravel?.id}`, { ...currentTravel });
  }

  async deleteBill(travelerId, billId) {
    const currentTravel = await this.getCurrentTravel(travelerId);
    const idx = currentTravel?.new_bills?.findIndex(bill => bill?.id === billId);
    currentTravel?.new_bills?.splice(idx, 1);

    await http.put(`/current-travels/${currentTravel?.id}`, { ...currentTravel });
  }

  async editBill(travelerId, billId, modifiedBill) {
    const currentTravel = await this.getCurrentTravel(travelerId);
    const idx = currentTravel?.new_bills?.findIndex(bill => bill?.id === billId);
    currentTravel.new_bills[idx] = {
      ...modifiedBill,
      id: currentTravel?.new_bills?.[idx]?.id,
    };

    await http.put(`/current-travels/${currentTravel?.id}`, { ...currentTravel });
  }
}
