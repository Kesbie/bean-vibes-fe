declare namespace App.Types.Address {
  type Coordinates = {
    latitude: number;
    longitude: number;
  };

  type AddressResponse = App.Types.Base.BaseResponse & {
    street: string;
    ward: string;
    district: string;
    fullAddress: string;
    coordinates: Coordinates;
  };
} 