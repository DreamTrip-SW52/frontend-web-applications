import http from "./common";

export class ReviewService {
  basePath = "/reviews";

  getReviews() {
    return http.get(this.basePath);
  }

  getReviewById(id) {
    return http.get(this.basePath + `/${id}`);
  }

  getReviewsByPackageId(packageId) {
    return http.get(this.basePath + `/packageId/${packageId}`);
  }

  getReviewOfPackageByTravelerId(packageId, travelerId) {
    return http.get(
      this.basePath + `/packageId/${packageId}/travelerId/${travelerId}`
    );
  }

  addReview(review) {
    return http.post(this.basePath, review);
  }

  updateReview(id, review) {
    return http.put(this.basePath + `/${id}`, review);
  }
}
