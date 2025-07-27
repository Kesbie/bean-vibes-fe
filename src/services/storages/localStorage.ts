class LocalStorage {
  load(key: string) {
    if (typeof window === 'undefined') return null;
    const value = localStorage.getItem(key);
    if (value === 'undefined') return null;

    return value ? JSON.parse(value) : null;
  }

  save(key: string, value: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
}

const localStorageService = new LocalStorage();

export default localStorageService;