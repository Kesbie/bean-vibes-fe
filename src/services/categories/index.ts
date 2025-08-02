import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

const getCategories: App.Services.CategoryService.getCategories = (filters) => {
  return promisePaginated<App.Types.Category.CategoryResponse>((axios) => axios.get('/categories', { params: filters }));
}

const getPublicCategories: App.Services.CategoryService.getCategories = (filters) => {
  return promisePaginated<App.Types.Category.CategoryResponse>((axios) => axios.get('/categories/public', { params: filters }));
}

const addCategory: App.Services.CategoryService.addCategory = (payload) => {
  return promise<App.Types.Category.CategoryResponse>((axios) => axios.post('/categories', payload));
}

const updateCategory: App.Services.CategoryService.updateCategory = (payload) => {  
  return promise<App.Types.Category.CategoryResponse>((axios) => axios.patch(`/categories/${payload.id}`, omit(payload, 'id')));
}

const deleteCategory: App.Services.CategoryService.deleteCategory = (id) => {
  return promise<App.Types.Category.CategoryResponse>((axios) => axios.delete(`/categories/${id}`));
}

export { getCategories, getPublicCategories, addCategory, updateCategory, deleteCategory };