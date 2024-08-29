export enum LocalStorageKey {
  UpvoteLists = 'appState.upvoteLists',
}

export interface LocalStorageModel {
  [LocalStorageKey.UpvoteLists]: UpvoteList[];
}

export interface UpvoteList {
  numberOfUpvote: number;
  isSelected: boolean;
}

export interface State {
  upvoteLists: UpvoteList[];
}

/**
 * With the help of TypeScript, we can define the shape of the action and check if action is valid or not.
 */
export type Action =
  { type: 'addUpvoteToList', payload: number } |
  { type: 'toggleSelectionStateOfList', payload: number };

export type AppDispatch = (action: Action) => void
