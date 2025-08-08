declare namespace App.Services.RatingsService {
  type ratePlace = (payload: App.Types.Rating.RatingCreate) => Response<App.Types.Rating.RatingResponse>;
  type getPlaceRatingByUser = (placeId: string) => Response<App.Types.Rating.RatingResponse>;
  type updatePlaceRating = (id: string, payload: App.Types.Rating.RatingCreate) => Response<App.Types.Rating.RatingResponse>;
}