import { ActionType, type IStateMessage } from './action'

const messageReducer = (message: IStateMessage | null = null, action: any): IStateMessage | null => {
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
