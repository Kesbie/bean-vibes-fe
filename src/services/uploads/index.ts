import { promise } from "../promise";

const ENDPOINT = "/upload";

const upload: App.Services.UploadService.upload = (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return promise<App.Types.Place.Photo[]>((axios) => axios.post(ENDPOINT, formData));
}

export { upload };