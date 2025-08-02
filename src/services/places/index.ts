import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

// Public APIs (không cần authentication)
const getPlaces: App.Services.PlacesService.getPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places', { params: filters }));
}

const getPublicPlaces: App.Services.PlacesService.getPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/public', { params: filters }));
}

const getPlace: App.Services.PlacesService.getPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`/places/${id}`));
}

const getPublicPlace: App.Services.PlacesService.getPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`/places/public/${id}`));
}

// User APIs (cần authentication)
const addPlace: App.Services.PlacesService.addPlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.post('/places/user', payload));
}

const updatePlace: App.Services.PlacesService.updatePlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.patch(`/places/user/${payload.id}`, omit(payload, 'id')));
}

const deletePlace: App.Services.PlacesService.deletePlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.delete(`/places/user/${id}`));
}

const getUserPlaces: App.Services.PlacesService.getUserPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/user', { params: filters }));
}

const getMyPlaces: App.Services.PlacesService.getMyPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/user/my-places', { params: filters }));
}

const getUserPlace: App.Services.PlacesService.getUserPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`/places/user/${id}`));
}

// Admin APIs
const getPlacesAdmin: App.Services.PlacesService.getPlacesAdmin = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/admin', { params: filters }));
}

const getPendingPlaces: App.Services.PlacesService.getPendingPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/admin/pending', { params: filters }));
}

const getAdminPlace: App.Services.PlacesService.getAdminPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.get(`/places/admin/${id}`));
}

const updateAdminPlace: App.Services.PlacesService.updateAdminPlace = (payload) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.patch(`/places/admin/${payload.id}`, omit(payload, 'id')));
}

const deleteAdminPlace: App.Services.PlacesService.deleteAdminPlace = (id) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.delete(`/places/admin/${id}`));
}

const approvePlace: App.Services.PlacesService.approvePlace = (id, isApproved, reason) => {
  return promise<App.Types.Place.PlaceResponse>((axios) => axios.patch(`/places/admin/${id}/approval-status`, { isApproved, reason }));
}

// Search APIs
const searchPlaces: App.Services.PlacesService.searchPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/public/search', { params: filters }));
}

const getTrendingPlaces: App.Services.PlacesService.getTrendingPlaces = (filters) => {
  return promise<App.Types.Place.PlaceResponse[]>((axios) => axios.get('/places/public/trending', { params: filters }));
}

const getHotPlacesWeekly: App.Services.PlacesService.getHotPlacesWeekly = (filters) => {
  return promise<App.Types.Place.PlaceResponse[]>((axios) => axios.get('/places/public/hot-weekly', { params: filters }));
}

const getVerifiedPlaces: App.Services.PlacesService.getVerifiedPlaces = (filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get('/places/public/verified', { params: filters }));
}

const getPlacesByCategory: App.Services.PlacesService.getPlacesByCategory = (categoryId, filters) => {
  return promisePaginated<App.Types.Place.PlaceResponse>((axios) => axios.get(`/places/public/category/${categoryId}`, { params: filters }));
}

const getHotPlacesByCategory: App.Services.PlacesService.getHotPlacesByCategory = (categoryId, filters) => {
  return promise<App.Types.Place.PlaceResponse[]>((axios) => axios.get(`/places/public/category/${categoryId}/hot`, { params: filters }));
}

// Content checking
const checkPlaceContent: App.Services.PlacesService.checkPlaceContent = (content) => {
  return promise<App.Types.Place.ContentCheckResponse>((axios) => axios.post('/places/user/check-content', { content }));
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
  getPlacesAdmin, 
  getPendingPlaces,
  getAdminPlace,
  updateAdminPlace,
  deleteAdminPlace,
  approvePlace,
  searchPlaces,
  getTrendingPlaces,
  getHotPlacesWeekly,
  getVerifiedPlaces,
  getPlacesByCategory,
  getHotPlacesByCategory,
  checkPlaceContent
};