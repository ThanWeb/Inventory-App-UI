import { ActionType } from './action'

const isLoadingReducer = (isLoading: boolean = false, action: any): boolean => {
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
