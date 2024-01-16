import type { AnyAction } from '@reduxjs/toolkit'

const ActionType = {
  SET_LOADING_TRUE: 'SET_LOADING_TRUE',
  SET_LOADING_FALSE: 'SET_LOADING_FALSE'
}

const setLoadingTrueActionCreator = (isLoading: boolean = false): AnyAction => {
  return {
    type: ActionType.SET_LOADING_TRUE,
    payload: {
      isLoading: true
    }
  }
}

const setLoadingFalseActionCreator = (): AnyAction => {
  return {
    type: ActionType.SET_LOADING_FALSE,
    payload: {
      isLoading: false
    }
  }
}

export {
  ActionType,
  setLoadingTrueActionCreator,
  setLoadingFalseActionCreator
}
