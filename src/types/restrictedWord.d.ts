declare namespace App.Types.RestrictedWord {
  type RestrictedWordResponse = App.Types.Base.BaseResponse & {
    word: string;
    replacement: string;
    normalizedWord: string;
  };

  type RestrictedWordCreate = {
    word: string;
    replacement?: string;
    normalizedWord?: string;
  };
}