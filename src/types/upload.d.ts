declare namespace App.Types.Upload {
  type UploadResponse = App.Types.Base.BaseResponse & {
    type: string;
    size: number;
    url: string;
    originalName: string;
    filename: string;
  };
}