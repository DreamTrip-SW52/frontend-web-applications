import http from "./common";

export class CurrentTravelService {
  purchasedPackagePath = "/purchasedPackage";
  economicFollowingPath = "/economicfollowings";
  healthCenterPath = "/healthcenter";
  policeStationPath = "/policestation";

  getCurrentTravelByTravelerId(travelerId) {
    return http.get(this.purchasedPackagePath + `/active/${travelerId}`);
  }

  getBillsByTravelerId(travelerId) {
    return http.get(this.economicFollowingPath + `/travelerid/${travelerId}`);
  }

  createBill(billData) {
    return http.post(this.economicFollowingPath, billData);
  }

  deleteBill(id) {
    return http.delete(this.economicFollowingPath + `/${id}`);
  }

  getHospitalsByLocationId(locationId) {
    return http.get(
      this.healthCenterPath + `/type/Hospital/location/${locationId}`
    );
  }

  getClinicsByLocationId(locationId) {
    return http.get(
      this.healthCenterPath + `/type/Clinic/location/${locationId}`
    );
  }

  getPoliceStationsByLocationId(locationId) {
    return http.get(this.policeStationPath + `/locationid/${locationId}`);
  }
}
