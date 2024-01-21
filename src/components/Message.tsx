import { type IStateMessage } from '@/store/message/action'
import type { ReactElement } from 'react'

const Loading = ({ message }: { message: IStateMessage | null }): ReactElement => {
  return <div
    className={`fixed w-full py-3 px-2 left-0 bottom-0 text-white text-center
    ${message === null ? 'hidden' : message.error ? 'bg-red-600' : 'bg-green-600'}`}
  >
    {message?.text}
  </div>
}

export default Loading
