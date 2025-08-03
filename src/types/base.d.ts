declare namespace App.Types.Base {
  type BaseResponse = {
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  type BaseFilter = {
    sortBy?: string,
    limit?: number,
    page?: number,
  }
}