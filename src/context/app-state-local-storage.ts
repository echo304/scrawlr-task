import { StorageServiceImpl } from "@lib/storage-service-impl";
import { LocalStorageKey, LocalStorageModel } from "@context/app-state-types";


/**
 * This is a service that interacts with the local storage.
 * It is used to store and retrieve the state of the app.
 * It validates the data before retrieving it from the local storage.
 */
export const localStorageService = new StorageServiceImpl<LocalStorageModel>(
  window.localStorage,
  [{
    key: LocalStorageKey.UpvoteLists,
    validateBeforeGet: (value: unknown) => {
      return Array.isArray(value) && value.every((item: any) => {
        return typeof item.numberOfUpvote === 'number' && typeof item.isSelected === 'boolean';
      });
    }
  }]
);