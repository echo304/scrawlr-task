import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { StorageServiceImpl, StorageValidator } from "../../src/lib/storage-service-impl";

describe("StorageServiceImpl", () => {
  interface TestStorageModel {
    myKey: string;
  }

  let storage: Storage;
  let validators: StorageValidator<TestStorageModel>[];
  let storageService: StorageServiceImpl<TestStorageModel>;

  beforeEach(() => {
    storage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };

    validators = [
      {
        key: "myKey",
        validateBeforeGet: (value: unknown) => {
          return typeof value === "string";
        }
      }
    ];
    storageService = new StorageServiceImpl(storage, validators);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set an item in the storage", () => {
    const key = "myKey";
    const value = "myValue";

    storageService.set(key, value);

    expect(storage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should get an item from the storage", () => {
    const key = "myKey";
    const value = "myValue";

    storage.getItem = vi.fn().mockReturnValue(JSON.stringify(value));
    // storage.getItem.mockImplementation((k: string) => JSON.stringify(value));

    const result = storageService.get(key);

    expect(storage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it("should return null when getting an item that is 'null' value", () => {
    const key = "myKey";

    storage.getItem = vi.fn().mockReturnValue(JSON.stringify(null));

    const result = storageService.get(key);

    expect(storage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it("should return null when getting an item that doesn't exist", () => {
    const key = "myKey";

    storage.getItem = vi.fn().mockReturnValue(null);

    const result = storageService.get(key);

    expect(storage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it("should return null when getting an item that doesn't pass validator", () => {
    const key = "myKey";

    /**
     * Mocking the storage.getItem to return a value that doesn't pass the validator
     * This is a case where the wrong value is stored in the storage
     */
    storage.getItem = vi.fn().mockReturnValue(JSON.stringify(true));

    const result = storageService.get(key);

    expect(storage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it("should remove an item from the storage", () => {
    const key = "myKey";

    storageService.remove(key);

    expect(storage.removeItem).toHaveBeenCalledWith(key);
  });

  it("should clear the storage", () => {
    storageService.clear();

    expect(storage.clear).toHaveBeenCalled();
  });
});