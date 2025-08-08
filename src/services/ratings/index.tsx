import { promise } from "../promise";

const ENDPOINT = "/rating";

const ratePlace: App.Services.RatingsService.ratePlace = (payload) => {
  return promise<App.Types.Rating.RatingResponse>((axios) =>
    axios.post(ENDPOINT, payload)
  );
};

const updatePlaceRating: App.Services.RatingsService.updatePlaceRating = (id, payload) => {
  return promise<App.Types.Rating.RatingResponse>((axios) =>
    axios.put(`${ENDPOINT}/${id}`, payload)
  );
};

const getPlaceRatingByUser: App.Services.RatingsService.getPlaceRatingByUser = (
  placeId
) => {
  return promise<App.Types.Rating.RatingResponse>((axios) =>
    axios.get(`${ENDPOINT}/${placeId}/user`)
  );
};

export { ratePlace, getPlaceRatingByUser, updatePlaceRating };
