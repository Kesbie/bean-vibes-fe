declare namespace App.Types.Rating {
  type RatingCreate = {
    place: string;
    user: string;
    drinkQuality: number;
    location: number;
    price: number;
    service: number;
    staffAttitude: number;
  };
} 