declare namespace App.Types.Reaction {
  export interface ReactionResponse {
    _id: string;
    review?: string;
    comment?: string;
    user?: User.UserResponse;
    type: 'like' | 'dislike';
  }

  export interface CreateReactionRequest {
    review?: string;
    comment?: string;
    type: 'like' | 'dislike';
  }
}