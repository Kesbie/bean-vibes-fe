declare namespace App.Types.Category {
  type CategoryResponse = App.Types.Base.BaseResponse & {
    name: string;
    slug: string;
    thumbnail: string;
    description: string;
    type: App.Types.Constants.CategoryType;
  };

  type CategoryCreate = {
    name: string;
    slug?: string;
    thumbnail?: Upload.UploadResponse;
    description?: string;
    type: App.Types.Constants.CategoryType;
  };

  type CategoryUpdate = {
    id: string;
    name: string;
    slug?: string;
    thumbnail?: Upload.UploadResponse;
    description?: string;
    type: App.Types.Constants.CategoryType;
  };
}