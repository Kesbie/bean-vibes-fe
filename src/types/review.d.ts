declare namespace App.Types.Review {
  export interface ReviewResponse {
    _id: string;
    content: string;
    rating: number;
    placeId: string;
    userId?: string;
    user?: {
      _id: string;
      name: string;
      email: string;
      avatar?: string;
    };
    isAnonymous: boolean;
    reactions?: ReactionResponse[];
    comments?: CommentResponse[];
    helpfulCount: number;
    viewCount?: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface CreateReviewRequest {
    content: string;
    rating: number;
    placeId: string;
    isAnonymous?: boolean;
  }

  export interface UpdateReviewRequest {
    id: string;
    content?: string;
    rating?: number;
    isAnonymous?: boolean;
  }

  export interface ReviewFilters {
    rating?: number;
    isAnonymous?: boolean;
    sortBy?: string;
    limit?: number;
    page?: number;
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