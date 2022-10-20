import http from "./common";

export class ReviewService {
  getReviews() {
    return http.get("/reviews");
  }

  getReviewById(id) {
    return http.get(`/rewiews/${id}`);
  }

  getReviewByPackageId(packageId) {
    return http.get(`/reviews/?packageId=${packageId}`);
  }

  getReviewTravellerByPackageId(packageId) {
    http: return http.get(`/reviews?packageId=${packageId}&_expand=traveller`);
  }

  addReview(review) {
    return http.post("/reviews", review);
  }
}
