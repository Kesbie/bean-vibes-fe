declare namespace App.Services.PlacesService {

  type placeFilters = PaginatedFilters & {
    category?: string[];
    name?: string;
  }

  type getPlaces = (filters?: placeFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getPublicPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getPlace = (id: string) => Response<App.Types.Place.PlaceResponse>;
  type getPublicPlace = (id: string) => Response<App.Types.Place.PlaceResponse>;
  type getPublicPlaceBySlug = (slug: string) => Response<App.Types.Place.PlaceResponse>;
  type addPlace = (payload: App.Types.Place.PlaceCreate) => Response<App.Types.Place.PlaceResponse>;
  type updatePlace = (payload: App.Types.Place.PlaceUpdate) => Response<App.Types.Place.PlaceResponse>;
  type deletePlace = (id: string) => Response<App.Types.Place.PlaceResponse>;
  type changePlaceApprovalStatus = (id: string, payload: { status: 'approved' | 'rejected', reason?: string }) => Response<App.Types.Places.PlacesResponse>;


  // User APIs
  type getUserPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getMyPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getUserPlace = (id: string) => Response<App.Types.Place.PlaceResponse>;

  // Admin APIs
  type getAdminPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getPendingPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getAdminPlace = (id: string) => Response<App.Types.Place.PlaceResponse>;
  type updateAdminPlace = (payload: App.Types.Place.PlaceUpdate) => Response<App.Types.Place.PlaceResponse>;
  type deleteAdminPlace = (id: string) => Response<App.Types.Place.PlaceResponse>;
  type approvePlace = (id: string, isApproved: boolean, reason?: string) => Response<App.Types.Place.PlaceResponse>;

  // Search APIs
  type searchPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getTrendingPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getHotPlacesWeekly = (filters?: PaginatedFilters) => Response<App.Types.Place.PlaceResponse[]>;
  type getVerifiedPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getPlacesByCategory = (categoryId: string, filters?: PaginatedFilters) => PaginatedResponse<App.Types.Place.PlaceResponse>;
  type getHotPlacesByCategory = (categoryId: string, filters?: PaginatedFilters) => Response<App.Types.Place.PlaceResponse[]>;

  // Content checking
  type checkPlaceContent = (content: string) => Response<App.Types.Place.ContentCheckResponse>;
}