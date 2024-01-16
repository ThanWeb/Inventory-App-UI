import type { AnyAction } from '@reduxjs/toolkit'

const ActionType = {
  SET_MESSAGE: 'SET_MESSAGE',
  UNSET_MESSAGE: 'UNSET_MESSAGE'
}

const setMessageActionCreator = (message: Record<string, any> | null = null): AnyAction => {
  return {
    type: ActionType.SET_MESSAGE,
    payload: {
      message
    }
  }
}

const unsetMessageActionCreator = (): AnyAction => {
  return {
    type: ActionType.UNSET_MESSAGE,
    payload: {
      message: null
    }
  }
}

export {
  ActionType,
  setMessageActionCreator,
  unsetMessageActionCreator
}
