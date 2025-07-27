declare namespace App.Types.Review {
  type ReviewResponse = App.Types.Base.BaseResponse & {
    placeId: string;
    userId: string;
    rating: number;
    comment: string;
  };
} 