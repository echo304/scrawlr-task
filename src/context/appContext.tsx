import React from "react";

type Action = { type: 'addUpvoteToList', payload: number } | { type: 'toggleSelectionStateOfList', payload: number }
type Dispatch = (action: Action) => void
type State = {  
  upvoteLists: {
    numberOfUpvote: number;
    upvoteState: boolean;
  }[]; 
}
type AppStateProviderProps = { children: React.ReactNode }

const AppStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

function appStateReducer(state: State, action: Action) {
	switch (action.type) {
		case 'addUpvoteToList': {
			return { upvoteLists: state.upvoteLists.map((upvoteList, index) => {
        if (index === action.payload) {
          return {
            ...upvoteList,
            numberOfUpvote: upvoteList.numberOfUpvote + 1
          }
        }
        return upvoteList;
      })}
    }
    case 'toggleSelectionStateOfList': {
      return { upvoteLists: state.upvoteLists.map((upvoteList, index) => {
        if (index === action.payload) {
        return {
          ...upvoteList,
          upvoteState: !upvoteList.upvoteState
        }
      }
      return upvoteList;
      })}
    }
    default: {
      return state;
    }
	}
}

function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, dispatch] = React.useReducer(appStateReducer, { upvoteLists: [
    { numberOfUpvote: 1, upvoteState: false },
    { numberOfUpvote: 1, upvoteState: false },
    { numberOfUpvote: 1, upvoteState: false },
  ] })

	const value = { state, dispatch }
	return (
    <>
      <AppStateContext.Provider value={value}>
        {children}
      </AppStateContext.Provider>
    </>
  )
}

function useAppState() {
	const context = React.useContext(AppStateContext)
	if (context === undefined) {
		throw new Error('useAppState must be used within a AppStateProvider')
	}
	return context
}

export { AppStateProvider, useAppState }