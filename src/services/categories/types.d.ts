declare namespace App.Services.CategoryService {

  type categoryFilters = PaginatedFilters & {
    type?: string;
    name?: string;
    region?: string;
    style?: string;
    purpose?: string;
    service?: string;
  }

  type getCategories = (filters?: categoryFilters) => PaginatedResponse<App.Types.Category.CategoryResponse>;
  type getPublicCategories = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.Category.CategoryResponse>;
  type addCategory = (payload: App.Types.Category.CategoryCreate) => Response<App.Types.Category.CategoryResponse>;
  type updateCategory = (payload: App.Types.Category.CategoryUpdate) => Response<App.Types.Category.CategoryResponse>;
  type deleteCategory = (id: string) => Response<App.Types.Category.CategoryResponse>;
}