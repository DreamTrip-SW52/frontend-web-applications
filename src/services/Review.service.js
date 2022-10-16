import http from "./common";

export class ReviewService {
  getReviews() {
    return http.get("/reviews");
  }

  getReviewById(id) {
    return http.get(`/rewiews/${id}`);
  }

  getReviewByPackageId(packageId) {
    return http.get(`/reviews?packageId=${packageId}`);
  }

  getReviewUserByPackageId(packageId) {
    http: return http.get(`/reviews?packageId=${packageId}&_expand=user`);
  }

  addReview(review) {
    return http.post("/reviews", review);
  }
}
