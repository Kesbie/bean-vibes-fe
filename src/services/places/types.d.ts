declare namespace App.Services.PlacesService {
  type getPlaces = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type getPlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  type addPlace = (payload: App.Types.Places.PlacesCreate) => Response<App.Types.Places.PlacesResponse>;
  type updatePlace = (payload: App.Types.Places.PlacesUpdate) => Response<App.Types.Places.PlacesResponse>;
  type deletePlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
  type getPlacesAdmin = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Places.PlacesResponse>;
  type approvePlace = (id: string) => Response<App.Types.Places.PlacesResponse>;
}