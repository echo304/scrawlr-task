import { describe, expect, test, vi } from 'vitest'
import { appStateReducer } from '../../src/context/app-reducer';

describe('appStateReducer', () => {
  const initialState = {
    upvoteLists: [
      { numberOfUpvote: 1, isSelected: false },
      { numberOfUpvote: 1, isSelected: false },
    ],
  };

  test('adds upvote to the list when addUpvoteToList action is dispatched', () => {
    const action = { type: 'addUpvoteToList', payload: 0 };
    const newState = appStateReducer(initialState, action);
    expect(newState.upvoteLists[0].numberOfUpvote).toBe(2);
  });

  test('toggles selection state of the list when toggleSelectionStateOfList action is dispatched', () => {
    const action = { type: 'toggleSelectionStateOfList', payload: 1 };
    const newState = appStateReducer(initialState, action);
    expect(newState.upvoteLists[1].isSelected).toBe(true);
  });

  test('returns the same state when an unknown action is dispatched', () => {
    const action = { type: 'unknownAction', payload: 0 };
    const newState = appStateReducer(initialState, action);
    expect(newState).toBe(initialState);
  });
});