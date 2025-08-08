class LocalStorage {
  load(key: string) {
    if (typeof window === 'undefined') return null;
    
    try {
      const value = localStorage.getItem(key);
      if (value === 'undefined' || value === null) return null;
      return JSON.parse(value);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }

  save(key: string, value: any) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  delete(key: string) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
    }
  }

  // Check if localStorage is available
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const localStorageService = new LocalStorage();

export default localStorageService;