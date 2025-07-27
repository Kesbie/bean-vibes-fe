declare namespace App.Services.RestrictedWordService {
  type getRestrictedWords = (filters?: PaginatedFilters) => PaginatedResponse<App.Types.RestrictedWord.RestrictedWordResponse>;
  type addRestrictedWord = (payload: App.Types.RestrictedWord.RestrictedWordCreate) => Response<App.Types.RestrictedWord.RestrictedWordResponse>;
  type updateRestrictedWord = (payload: App.Types.RestrictedWord.RestrictedWordUpdate) => Response<App.Types.RestrictedWord.RestrictedWordResponse>;
  type deleteRestrictedWord = (id: string) => Response<App.Types.RestrictedWord.RestrictedWordResponse>;
}