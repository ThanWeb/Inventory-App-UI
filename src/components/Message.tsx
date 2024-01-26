import { type IStateMessage } from '@/store/message/action'
import type { ReactElement } from 'react'

const Message = ({ message }: { message: IStateMessage | null }): ReactElement => {
  return <div
    className={`fixed w-full z-50 py-3 px-2 left-0 bottom-0 text-white text-center
    ${message === null ? 'hidden' : message.error ? 'bg-red-600' : 'bg-green-600'}`}
  >
    {message?.text}
  </div>
}

export default Message
