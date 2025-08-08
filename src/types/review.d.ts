declare namespace App.Types.Review {
  export type ReviewResponse = Base.BaseResponse & {
    place?: Place.PlaceResponse;
    user?: User.UserResponse;
    title: string;
    content: string;
    isAnonymous: boolean;
    reactions?: Reaction.ReactionResponse[];
    comments?: Comment.CommentResponse[];
  }

  export interface CreateReviewData {
    place: string;
    user?: string;
    title: string;
    content: string;
    photos: string[];
    isAnonymous?: boolean;
  }

  export interface UpdateReviewData {
    title?: string;
    content?: string;
    photos?: string[];
    isAnonymous?: boolean;
  }

  export type ReviewFilters = Base.BaseFilter & {
    place?: string;
    user?: string;
    rating?: number;
    isAnonymous?: boolean;
  }
}

declare namespace App.Types.Reaction {
  export interface ReactionResponse {
    _id: string;
    type: 'like' | 'love' | 'helpful' | 'funny';
    userId: string;
    reviewId: string;
    createdAt: string;
  }

  export interface CreateReactionRequest {
    type: 'like' | 'love' | 'helpful' | 'funny';
  }
}

declare namespace App.Types.Comment {
  export interface CommentResponse {
    _id: string;
    content: string;
    userId: string;
    user?: {
      _id: string;
      name: string;
      email: string;
      avatar?: string;
    };
    reviewId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface CreateCommentRequest {
    content: string;
  }
} 