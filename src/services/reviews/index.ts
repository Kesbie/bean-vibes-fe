import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

// Get reviews by place
const getReviewsByPlace: App.Services.ReviewService.getReviewsByPlace = (placeId, filters) => {
  return promisePaginated<App.Types.Review.ReviewResponse>((axios) => axios.get(`/reviews/place/${placeId}`, { params: filters }));
}

// Get review by ID
const getReview: App.Services.ReviewService.getReview = (reviewId) => {
  return promise<App.Types.Review.ReviewResponse>((axios) => axios.get(`/reviews/${reviewId}`));
}

// Create review
const createReview: App.Services.ReviewService.createReview = (payload) => {
  return promise<App.Types.Review.ReviewResponse>((axios) => axios.post('/reviews', payload));
}

// Update review
const updateReview: App.Services.ReviewService.updateReview = (payload) => {
  return promise<App.Types.Review.ReviewResponse>((axios) => axios.patch(`/reviews/${payload.id}`, omit(payload, 'id')));
}

// Delete review
const deleteReview: App.Services.ReviewService.deleteReview = (id) => {
  return promise<App.Types.Review.ReviewResponse>((axios) => axios.delete(`/reviews/${id}`));
}

// Add reaction to review
const addReactionToReview: App.Services.ReviewService.addReactionToReview = (reviewId, payload) => {
  return promise<App.Types.Reaction.ReactionResponse>((axios) => axios.post(`/reviews/${reviewId}/reactions`, payload));
}

// Remove reaction from review
const removeReactionFromReview: App.Services.ReviewService.removeReactionFromReview = (reviewId, payload) => {
  return promise<App.Types.Reaction.ReactionResponse>((axios) => axios.delete(`/reviews/${reviewId}/reactions`, { data: payload }));
}

// Add comment to review
const addCommentToReview: App.Services.ReviewService.addCommentToReview = (reviewId, payload) => {
  return promise<App.Types.Comment.CommentResponse>((axios) => axios.post(`/reviews/${reviewId}/comments`, payload));
}

// Increment view count
const incrementViewCount: App.Services.ReviewService.incrementViewCount = (reviewId) => {
  return promise<App.Types.Review.ReviewResponse>((axios) => axios.post(`/reviews/${reviewId}/view`));
}

export { 
  getReviewsByPlace, 
  getReview, 
  createReview, 
  updateReview, 
  deleteReview,
  addReactionToReview,
  removeReactionFromReview,
  addCommentToReview,
  incrementViewCount
}; 