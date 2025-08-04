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

  type PlaceResponse = Base.BaseResponse & {
    id: string;
    name: string;
    description: string;
    address: {
      fullAddress: string;
      district: string;
      ward: string;
      street: string;
    };
    categories: CategoryResponse[];
    photos?: string[];
    rating?: number;
    price?: Price;
    time?: Time;
    wifi?: Wifi;
    social?: Social[];
    totalRatings?: number;
    totalReviews?: number;
    hotScore?: number;
    approvalStatus?: 'pending' | 'approved' | 'rejected';
    isVerified?: boolean;
    status?: 'active' | 'inactive';
  }

  interface PlaceCreate {
    name: string;
    description: string;
    address: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    website?: string;
    time?: Time;
    price?: Price;
    wifi?: Wifi;
    social?: Social[];
    categories: string[];
    photos?: string[];
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

  interface ContentCheckResponse {
    hasRestrictedWords: boolean;
    filteredContent: string;
    restrictedWords: string[];
  }
} 