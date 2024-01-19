import { ActionType, type IStateUser } from './action'

const userReducer = (user: IStateUser | null = null, action: any): IStateUser | null => {
  switch (action.type) {
  case ActionType.SET_USER:
    return action.payload.user
  case ActionType.UNSET_USER:
    return null
  default:
    return user
  }
}

export default userReducer
