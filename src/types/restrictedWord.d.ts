declare namespace App.Types.RestrictedWord {
  type RestrictedWordType = keyof typeof import("@/constants").RESTRICTED_WORD_TYPES;

  type RestrictedWordResponse = App.Types.Base.BaseResponse & {
    word: string;
    replacement: string;
    normalizedWord: string;
    type: RestrictedWordType;
  };

  type RestrictedWordCreate = {
    word: string;
    replacement?: string;
    type: RestrictedWordType;
  };

  type RestrictedWordUpdate = {
    id: string;
    word: string;
    replacement?: string;
    type: RestrictedWordType;
  };
}