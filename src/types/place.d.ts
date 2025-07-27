declare namespace App.Types.Place {
  type Time = {
    open: string;
    close: string;
  };

  type Social = {
    type: App.Types.Constants.SocialType;
    url: string;
  }

  type Price = {
    min: number;
    max: number;
  }

  type Wifi = {
    name: string;
    password: string;
  }

  type PlaceResponse = App.Types.Base.BaseResponse & {
    name: string;
    photos: string[];
    description: string;
    address: App.Types.Address.AddressResponse;
    status: string;
    categories: App.Types.Category.CategoryResponse[];
    approvalStatus: string;
    time: Time;
    price: Price;
    wifi: Wifi;
    averageRating: number;
    totalRatings: number;
    viewCount: number;
    hotScore: number;
    weeklyViews: number;
    weeklyHotScore: number;
    createdBy?: App.Types.User.UserResponse;
    approvedBy?: App.Types.User.UserResponse;
  };  

  type PlaceCreate = {
    name: string;
    slug?: string;
    thumbnail?: string;
    description?: string;
  };
} 