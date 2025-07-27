import { promise } from "../promise";

const ENDPOINT = "/upload";

const uploadMedia: App.Services.UploadService.uploadMedia = (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return promise<App.Types.Upload.UploadResponse[]>((axios) => axios.post(ENDPOINT, formData));
}

const getMediaById: App.Services.UploadService.getMediaById = (id) => {
  return promise<App.Types.Upload.UploadResponse>((axios) => axios.get(`${ENDPOINT}/${id}`));
}

export { uploadMedia, getMediaById };