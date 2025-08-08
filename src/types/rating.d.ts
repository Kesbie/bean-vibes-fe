declare namespace App.Types.Rating {
  type RatingResponse = Base.BaseResponse & {
    place: App.Types.Place.PlaceResponse;
    user: App.Types.User.UserResponse;
    drinkQuality: number;
    location: number;
    price: number;
    service: number;
    staffAttitude: number;
  };

  type RatingCreate = {
    place: string;
    drinkQuality: number;
    location: number;
    price: number;
    service: number;
    staffAttitude: number;
  };
} 