declare namespace App.Services.UserService {
  type GetUser = (id: string) => Response<App.Types.User.UserResponse>;
  type GetUsers = (filters: App.Services.PaginatedFilters) => PaginatedResponse<App.Types.User.UserResponse>;
  type AddUser = (payload: App.Types.User.UserCreate) => Response<App.Types.User.UserResponse>;
  type UpdateUser = (payload: App.Types.User.UserResponse) => Response<App.Types.User.UserResponse>;
}