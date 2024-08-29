import { Action, State } from "@context/app-state-types";

/**
 * It is basically a reducer function that takes the current state and an action and returns the new state like a Redux reducer.
 */
export function appStateReducer(state: State, action: Action) {
  switch (action.type) {
    case 'addUpvoteToList': {
      return {
        upvoteLists: state.upvoteLists.map((upvoteList, index) => {
          if (index === action.payload) {
            return {
              ...upvoteList,
              numberOfUpvote: upvoteList.numberOfUpvote + 1
            }
          }
          return upvoteList;
        })
      }
    }
    case 'toggleSelectionStateOfList': {
      return {
        upvoteLists: state.upvoteLists.map((upvoteList, index) => {
          if (index === action.payload) {
            return {
              ...upvoteList,
              isSelected: !upvoteList.isSelected
            }
          }
          return upvoteList;
        })
      }
    }
    default: {
      return state;
    }
  }
}