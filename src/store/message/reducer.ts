import type { AnyAction } from '@reduxjs/toolkit'
import { ActionType } from './action'

const messageReducer = (message: Record<string, any> | null = null, action: AnyAction = { type: '' }): any => {
  switch (action.type) {
  case ActionType.SET_MESSAGE:
    return action.payload.message
  case ActionType.UNSET_MESSAGE:
    return null
  default:
    return message
  }
}

export default messageReducer
