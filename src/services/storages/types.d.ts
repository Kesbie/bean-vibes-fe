declare namespace App.Services.Storages {
  export interface LocalStorage {
    load(key: string): any;
    save(key: string, value: any): void;
    delete(key: string): void;
  }
}