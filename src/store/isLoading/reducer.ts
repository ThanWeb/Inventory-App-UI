import type { AnyAction } from '@reduxjs/toolkit'
import { ActionType } from './action'

const isLoadingReducer = (isLoading: boolean = false, action: AnyAction = { type: '' }): any => {
  switch (action.type) {
  case ActionType.SET_LOADING_FALSE:
    return false
  case ActionType.SET_LOADING_TRUE:
    return true
  default:
    return isLoading
  }
}

export default isLoadingReducer
