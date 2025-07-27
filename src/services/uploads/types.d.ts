declare namespace App.Services.UploadService {
  type uploadMedia = (files: File[]) => Response<App.Types.Upload.UploadResponse[]>;
  type getMediaById = (id: string) => Response<App.Types.Upload.UploadResponse>;
}