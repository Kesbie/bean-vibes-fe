declare namespace App.Services.CategoryService {
  type getCategories = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Category.CategoryResponse>;
  type getPublicCategories = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Category.CategoryResponse>;
  type addCategory = (payload: App.Types.Category.CategoryCreate) => Response<App.Types.Category.CategoryResponse>;
  type updateCategory = (payload: App.Types.Category.CategoryUpdate) => Response<App.Types.Category.CategoryResponse>;
  type deleteCategory = (id: string) => Response<App.Types.Category.CategoryResponse>;
}