declare namespace App.Services {
  export type PaginatedFilters = {
    page?: number;
    limit?: number;
    sortBy?: string;
  }

  export interface BaseService {
    axios: Axios;
    accessToken?: string | null;
    refreshToken?: string | null;
    localStorage: LocalStorage;
  }

  export type PaginatedData<T> = {
    results: T[];
    totalResults: number;
    totalPages: number;
    page: number;
    limit: number;
  }

  export type BasePaginatedResponse<T> = {
    code: number;
    data?: PaginatedData<T>;
    message: string;
  }

  export type BaseDataResponse<T> = {
    code: number;
    data?: T;
    message: string;
  }

  export type Response<T> = Promise<BaseDataResponse<T>>;

  export type PaginatedResponse<T> = Promise<BasePaginatedResponse<T>>;

  // Review Service
  export interface ReviewService {
    getReviewsByPlace: (placeId: string, filters?: App.Types.Review.ReviewFilters) => PaginatedResponse<App.Types.Review.ReviewResponse>;
    getReview: (reviewId: string) => Response<App.Types.Review.ReviewResponse>;
    createReview: (payload: App.Types.Review.CreateReviewRequest) => Response<App.Types.Review.ReviewResponse>;
    updateReview: (payload: App.Types.Review.UpdateReviewRequest) => Response<App.Types.Review.ReviewResponse>;
    deleteReview: (id: string) => Response<App.Types.Review.ReviewResponse>;
    addReactionToReview: (reviewId: string, payload: App.Types.Reaction.CreateReactionRequest) => Response<App.Types.Reaction.ReactionResponse>;
    removeReactionFromReview: (reviewId: string, payload: App.Types.Reaction.CreateReactionRequest) => Response<App.Types.Reaction.ReactionResponse>;
    addCommentToReview: (reviewId: string, payload: App.Types.Comment.CreateCommentRequest) => Response<App.Types.Comment.CommentResponse>;
    incrementViewCount: (reviewId: string) => Response<App.Types.Review.ReviewResponse>;
  }
}