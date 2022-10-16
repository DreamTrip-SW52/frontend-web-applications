import http from "./common";

export class ReviewService {
  getReviews() {
    return http.get("/reviews");
  }

  getReviewById(id) {
    return http.get(`/rewiews/${id}`);
  }
}
