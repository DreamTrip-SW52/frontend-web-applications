import http from './common';

export class ReviewService {
  getReviews() {
    return http.get('/reviews');
  }

  filterreview(comment_lte = null) {
    let url = BASE_URL;

    if (comment_lte) {
      url = url + `&comment_lte=${comment_lte}`;
    }

    const encodedURL = encodeURI(url);
    console.log(encodedURL);
    return http.get(encodedURL);
  }

  getReviewById(id) {
    return http.get(`/reviews/${id}`);
  }

  getReviewsByPackageId(packageId) {
    return http.get(`/reviews/packageId/${packageId}`);
  }

  getReviewTravellerByPackageId(packageId) {
    http: return http.get(`/reviews?packageId=${packageId}&_expand=traveller`);
  }

  addReview(review) {
    return http.post('/reviews', review);
  }

  updateReview(id, review) {
    return http.patch(`/reviews/${id}`, review);
  }

  getReviewByPackageIdAndTravellerId(packageId, travellerId) {
    http: return http.get(
      `/reviews?packageId=${packageId}&travellerId=${travellerId}`
    );
  }
}
