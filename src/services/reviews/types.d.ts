declare namespace App.Services.ReviewService {
  export type getReviewsByPlace = (placeId: string, filters: App.Types.Review.ReviewFilters) => PromisePaginated<App.Types.Review.ReviewResponse>;
  export type getReview = (reviewId: string) => Response<App.Types.Review.ReviewResponse>;
  export type createReview = (payload: App.Types.Review.ReviewRequest) => Response<App.Types.Review.ReviewResponse>;
  export type updateReview = (payload: App.Types.Review.ReviewRequest) => Response<App.Types.Review.ReviewResponse>;
  export type deleteReview = (reviewId: string) => Response<App.Types.Review.ReviewResponse>;
  export type addReactionToReview = (reviewId: string, payload: App.Types.Review.ReactionRequest) => Response<App.Types.Reaction.ReactionResponse>;
  export type removeReactionFromReview = (reviewId: string, payload: App.Types.Review.ReactionRequest) => Response<App.Types.Reaction.ReactionResponse>;
  export type addCommentToReview = (reviewId: string, payload: App.Types.Review.CommentRequest) => Response<App.Types.Comment.CommentResponse>;
  export type incrementViewCount = (reviewId: string) => Response<App.Types.Review.ReviewResponse>;
}