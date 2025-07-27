import { promise, promisePaginated } from "../promise";
import { omit } from "lodash";

const getRestrictedWords: App.Services.RestrictedWordService.getRestrictedWords = (filters) => {
  return promisePaginated<App.Types.RestrictedWord.RestrictedWordResponse>((axios) => axios.get('/restricted-words', { params: filters }));
}

const addRestrictedWord: App.Services.RestrictedWordService.addRestrictedWord = (payload) => {
  return promise<App.Types.RestrictedWord.RestrictedWordResponse>((axios) => axios.post('/restricted-words', payload));
}

const updateRestrictedWord: App.Services.RestrictedWordService.updateRestrictedWord = (payload) => {
  return promise<App.Types.RestrictedWord.RestrictedWordResponse>((axios) => axios.patch(`/restricted-words/${payload.id}`, omit(payload, 'id')));
}

const deleteRestrictedWord: App.Services.RestrictedWordService.deleteRestrictedWord = (id) => {
  return promise<App.Types.RestrictedWord.RestrictedWordResponse>((axios) => axios.delete(`/restricted-words/${id}`));
}

export { getRestrictedWords, addRestrictedWord, updateRestrictedWord, deleteRestrictedWord };