declare namespace App.Services.UploadService {
  type upload = (files: File[]) => Response<App.Types.Place.Photo[]>;
  type getMediaById = (id: string) => Response<App.Types.Upload.UploadResponse>;
}