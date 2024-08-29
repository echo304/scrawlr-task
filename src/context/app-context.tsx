import React, { useEffect } from "react";
import { appStateReducer } from "@context/app-reducer";
import { localStorageService } from "@context/app-state-local-storage";
import { AppDispatch, LocalStorageKey, State } from "@context/app-state-types";


type AppStateProviderProps = { children: React.ReactNode, initialState?: State }

const AppStateContext = React.createContext<
  { state: State; dispatch: AppDispatch } | undefined
>(undefined);

/**
 * This is the provider component that will wrap our app and provide the state and dispatch function to the app.
 * It will also save the state to the local storage whenever it changes.
 */
function AppStateProvider({ children, initialState }: AppStateProviderProps) {
  const DEFAULT_STATE: State = {
    upvoteLists: [
      { numberOfUpvote: 1, isSelected: false },
      { numberOfUpvote: 1, isSelected: false },
      { numberOfUpvote: 1, isSelected: false },
    ]
  };

  function initializeAppState() {
    const upvoteLists = localStorageService.get(LocalStorageKey.UpvoteLists);

    if (upvoteLists) {
      return { upvoteLists };
    }

    return initialState ?? DEFAULT_STATE;
  }

  const [state, dispatch] = React.useReducer(appStateReducer, initializeAppState());

  /**
   * This effect will run whenever the upvoteLists state changes and will save the state to the local storage.
   */
  useEffect(() => {
    localStorageService.set(LocalStorageKey.UpvoteLists, state.upvoteLists);
  }, [state.upvoteLists])

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