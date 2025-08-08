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

  type RatingDetails = {
    drinkQuality: number;
    location: number;
    price: number;
    service: number;
    staffAttitude: number;
    totalRatings: number;
  }

  type Photo = {
    id: string;
    url: string;
    originalName: string;
    name: string;
    format: string;
    size: number;
  }

  type PlaceResponse = Base.BaseResponse & {
    name: string;
    description: string;
    address: Address.AddressResponse;
    slug: string;
    categories: CategoryResponse[];
    photos?: Photo[];
    rating?: number;
    price?: Price;
    time?: Time;
    wifi?: Wifi;
    reviews?: Review.ReviewResponse[];
    socials?: Social[];
    averageRating?: number;
    totalRatings?: number;
    totalReviews?: number;
    hotScore?: number;
    approvalStatus?: 'pending' | 'approved' | 'rejected';
    isVerified?: boolean;
    status?: 'active' | 'inactive';
    ratingDetails: RatingDetails;
  }

  interface PlaceCreate {
    name: string;
    description: string;
    address: {
      fullAddress: string;
      location?: [number, number];
    };
    time?: Time;
    price?: Price;
    wifi?: Wifi;
    socials?: Social[];
    categories: string[];
    photos?: Photo[];
  }

  interface PlaceUpdate {
    id: string;
    name?: string;
    description?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    website?: string;
    time?: Time;
    price?: Price;
    wifi?: Wifi;
    social?: Social[];
    categories?: string[];
    photos?: string[];
    status?: 'active' | 'inactive';
    isApproved?: boolean;
    isVerified?: boolean;
  }
  
  interface PlaceChangeApprovalStatusUpdate {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    reason?: string;
  }

  interface ContentCheckResponse {
    hasRestrictedWords: boolean;
    filteredContent: string;
    restrictedWords: string[];
  }
} 