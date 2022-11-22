import http from "./common";

export class ReviewService {
  basePath = "/reviews";

  getReviews() {
    return http.get(this.basePath);
  }

  // filterreview(comment_lte = null) {
  //   let url = BASE_URL;

  //   if (comment_lte) {
  //     url = url + `&comment_lte=${comment_lte}`;
  //   }

  //   const encodedURL = encodeURI(url);
  //   console.log(encodedURL);
  //   return http.get(encodedURL);
  // }

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
    return http.patch(this.basePath + `/${id}`, review);
  }

  // getReviewByPackageIdAndTravellerId(packageId, travellerId) {
  //   http: return http.get(
  //     `/reviews?packageId=${packageId}&travellerId=${travellerId}`
  //   );
  // }
}
