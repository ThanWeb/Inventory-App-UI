import { type Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

interface IStateUser {
  id: number
  username: string
}

const ActionType = {
  SET_USER: 'SET_USER',
  UNSET_USER: 'UNSET_USER'
}

const setUserActionCreator = (user: IStateUser | null = null): { type: string, payload: { user: IStateUser | null } } => {
  return {
    type: ActionType.SET_USER,
    payload: {
      user
    }
  }
}

const unsetUserActionCreator = (): { type: string, payload: { user: IStateUser | null } } => {
  return {
    type: ActionType.UNSET_USER,
    payload: {
      user: null
    }
  }
}

const asyncSetUser = ({ username, password }: { username: string, password: string }): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response: { error: boolean, accessToken: string, message: string, user: IStateUser } = await api.loginAdmin({ username, password })

      if (response.error) {
        return response
      } else {
        api.putAccessToken(`${response.accessToken}`)
        dispatch(setUserActionCreator(response.user))
        return {
          error: false,
          message: 'Selamat Datang'
        }
      }
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

const asyncUnsetAuthUser = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.logout()

      if (!response.error) {
        dispatch(unsetUserActionCreator())
        api.putAccessToken('')
      }

      return response
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

export {
  type IStateUser,
  ActionType,
  setUserActionCreator,
  unsetUserActionCreator,
  asyncSetUser,
  asyncUnsetAuthUser
}
