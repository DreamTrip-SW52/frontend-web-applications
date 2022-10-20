import http from "./common";

export class ImageService {
  getImages() {
    return http.get("/images");
  }

  getImageById(id) {
    return http.get(`/images/${id}`);
  }

  getImageByPackageId(packageId) {
    return http.get(`/images/?packageId=${packageId}`);
  }
}
