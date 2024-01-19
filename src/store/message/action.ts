interface IStateMessage {
  error: boolean
  text: string
}

const ActionType = {
  SET_MESSAGE: 'SET_MESSAGE',
  UNSET_MESSAGE: 'UNSET_MESSAGE'
}

const setMessageActionCreator = (message: IStateMessage | null = null): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.SET_MESSAGE,
    payload: {
      message
    }
  }
}

const unsetMessageActionCreator = (): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.UNSET_MESSAGE,
    payload: {
      message: null
    }
  }
}

export {
  type IStateMessage,
  ActionType,
  setMessageActionCreator,
  unsetMessageActionCreator
}
