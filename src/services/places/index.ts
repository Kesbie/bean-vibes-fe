import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

const ENDPOINT = '/places';

const getPlaces: App.Services.PlacesService.getPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(ENDPOINT, { params: filters }));
}

const getPlace: App.Services.PlacesService.getPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/${id}`));
}

const addPlace: App.Services.PlacesService.addPlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.post(ENDPOINT, payload));
}

const updatePlace: App.Services.PlacesService.updatePlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.patch(`${ENDPOINT}/${payload.id}`, omit(payload, 'id')));
}

const deletePlace: App.Services.PlacesService.deletePlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.delete(`${ENDPOINT}/${id}`));
}

const getPlacesAdmin: App.Services.PlacesService.getPlacesAdmin = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/admin`, { params: filters }));
}

const approvePlace: App.Services.PlacesService.approvePlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.post(`${ENDPOINT}/${id}/approve`));
}

export { getPlaces, getPlace, addPlace, updatePlace, deletePlace, getPlacesAdmin, approvePlace };