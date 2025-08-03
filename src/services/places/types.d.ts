declare namespace App.Services.PlacesService {

  type placeFilters = PaginatedFilters & {
    categories?: string[];
    name?: string;
  }

  type getPlaces = (filters?: placeFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getPublicPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getPlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  type getPublicPlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  type addPlace = (payload: App.Types.Places.PlacesCreate) => Response<App.Types.Places.PlacesResponse>;
  type updatePlace = (payload: App.Types.Places.PlacesUpdate) => Response<App.Types.Places.PlacesResponse>;
  type deletePlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  
  // User APIs
  type getUserPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getMyPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getUserPlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  
  // Admin APIs
  type getPlacesAdmin = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getPendingPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getAdminPlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  type updateAdminPlace = (payload: App.Types.Places.PlacesUpdate) => Response<App.Types.Places.PlacesResponse>;
  type deleteAdminPlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  type approvePlace = (id: string, isApproved: boolean, reason?: string) => Response<App.Types.Places.PlacesResponse>;
  
  // Search APIs
  type searchPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getTrendingPlaces = (filters?: PaginatedFilters) => Response<App.Types.Places.PlacesResponse[]>;
  type getHotPlacesWeekly = (filters?: PaginatedFilters) => Response<App.Types.Places.PlacesResponse[]>;
  type getVerifiedPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getPlacesByCategory = (categoryId: string, filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getHotPlacesByCategory = (categoryId: string, filters?: PaginatedFilters) => Response<App.Types.Places.PlacesResponse[]>;
  
  // Content checking
  type checkPlaceContent = (content: string) => Response<App.Types.Place.ContentCheckResponse>;
}