import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

const ENDPOINT = "/places";

// Public APIs (không cần authentication)
const getPlaces: App.Services.PlacesService.getPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(ENDPOINT, { params: filters }));
}

const getPublicPlaces: App.Services.PlacesService.getPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/public`, { params: filters }));
}

const getPlace: App.Services.PlacesService.getPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/${id}`));
}

const getPublicPlace: App.Services.PlacesService.getPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/${id}/info`));
}

const getPublicPlaceBySlug: App.Services.PlacesService.getPublicPlaceBySlug = (slug) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/slug/${slug}`));
}

// User APIs (cần authentication)
const addPlace: App.Services.PlacesService.addPlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.post(`${ENDPOINT}`, payload));
}

const updatePlace: App.Services.PlacesService.updatePlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.patch(`${ENDPOINT}/user/${payload.id}`, omit(payload, 'id')));
}

const deletePlace: App.Services.PlacesService.deletePlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.delete(`${ENDPOINT}/user/${id}`));
}

const getUserPlaces: App.Services.PlacesService.getUserPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/user`, { params: filters }));
}

const getMyPlaces: App.Services.PlacesService.getMyPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/user/my-places`, { params: filters }));
}

const getUserPlace: App.Services.PlacesService.getUserPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/user/${id}`));
}

// Admin APIs
const getAdminPlaces: App.Services.PlacesService.getAdminPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/admin`, { params: filters }));
}

const getPendingPlaces: App.Services.PlacesService.getPendingPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/admin/pending`, { params: filters }));
}

const getAdminPlace: App.Services.PlacesService.getAdminPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/admin/${id}`));
}

const updateAdminPlace: App.Services.PlacesService.updateAdminPlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.patch(`${ENDPOINT}/admin/${payload.id}`, omit(payload, 'id')));
}

const deleteAdminPlace: App.Services.PlacesService.deleteAdminPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.delete(`${ENDPOINT}/admin/${id}`));
}

const changePlaceApprovalStatus: App.Services.PlacesService.changePlaceApprovalStatus = (id, payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.post(`${ENDPOINT}/${id}/approval-status`, payload));
}

// Search APIs
const searchPlaces: App.Services.PlacesService.searchPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/public/search`, { params: filters }));
}

const getTrendingPlaces: App.Services.PlacesService.getTrendingPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/trending`, { params: filters }));
}

const getHotPlacesWeekly: App.Services.PlacesService.getHotPlacesWeekly = (filters) => {
  return promise<App.Types.Place.PlaceResponse[]>((axios) => axios.get(`${ENDPOINT}/public/hot-weekly`, { params: filters }));
}

const getVerifiedPlaces: App.Services.PlacesService.getVerifiedPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/public/verified`, { params: filters }));
}

const getPlacesByCategory: App.Services.PlacesService.getPlacesByCategory = (categoryId, filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`${ENDPOINT}/public/category/${categoryId}`, { params: filters }));
}

const getHotPlacesByCategory: App.Services.PlacesService.getHotPlacesByCategory = (categoryId, filters) => {
  return promise<App.Types.Place.PlaceResponse[]>((axios) => axios.get(`${ENDPOINT}/public/category/${categoryId}/hot`, { params: filters }));
}

// Content checking
const checkPlaceContent: App.Services.PlacesService.checkPlaceContent = (content) => {
  return promise<App.Types.Place.ContentCheckResponse>((axios) => axios.post(`${ENDPOINT}/user/check-content`, { content }));
}

export {
  getPlaces,
  getPublicPlaces,
  getPlace,
  getPublicPlace,
  addPlace,
  updatePlace,
  deletePlace,
  getUserPlaces,
  getMyPlaces,
  getUserPlace,
  getAdminPlaces,
  getPendingPlaces,
  getAdminPlace,
  updateAdminPlace,
  deleteAdminPlace,
  searchPlaces,
  getTrendingPlaces,
  getHotPlacesWeekly,
  getVerifiedPlaces,
  getPlacesByCategory,
  getHotPlacesByCategory,
  checkPlaceContent,
  getPublicPlaceBySlug,
  changePlaceApprovalStatus
};