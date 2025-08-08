declare namespace App.Types.Address {
  type AddressResponse = App.Types.Base.BaseResponse & {
    fullAddress: string;
    location?: [number, number];
  };
} 