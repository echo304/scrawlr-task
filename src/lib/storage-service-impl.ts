import { StorageService } from "@lib/storage-service";

export interface StorageValidator<T> {
  key: keyof T;
  validateBeforeGet: (value: T[keyof T]) => boolean;
}

export class StorageServiceImpl<T> implements StorageService<T> {
  constructor(private readonly storage: Storage, private readonly validators: StorageValidator<T>[]) { }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.storage.setItem(key.toString(), JSON.stringify(value));
  }

  get<K extends keyof T>(key: K): T[K] | null {
    const value = this.storage.getItem(key.toString());

    if (value === null || value === 'null'
      || value === undefined || value === 'undefined') {
      return null;
    }

    try {
      const parsedValue = JSON.parse(value);

      const validators = this.validators.filter(validator => validator.key === key);
      if (validators.length > 0 && !validators.some(validator => validator.validateBeforeGet(parsedValue))) {
        /**
         * To handle invalid values, you can throw an error or log it to a logging service like Sentry and return null
         * 
         * throw new Error(`Invalid value for key: ${String(key)}`);
         * Sentry.captureMessage(`LocalStorageService: Invalid value for key: ${String(key)} - ${JSON.stringify(parsedValue)}`);
         */
        return null;
      }

      return parsedValue;
    } catch (error) {
      /**
       * To handle JSON parsing errors, log it to a logging service like Sentry and return null
       * 
       * Sentry.captureException(error);
       */
      return null;
    }
  }

  remove<K extends keyof T>(key: K): void {
    this.storage.removeItem(key.toString());
  }

  clear(): void {
    this.storage.clear();
  }
}