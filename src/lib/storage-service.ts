export interface StorageService<T> {
  get<K extends keyof T>(key: K): T[K] | null;

  set<K extends keyof T>(key: K, value: T[K]): void;

  remove<K extends keyof T>(key: K): void;

  clear(): void;
}