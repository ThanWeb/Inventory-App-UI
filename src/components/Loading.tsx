import type { ReactElement } from 'react'

const Loading = ({ isLoading }: { isLoading: boolean }): ReactElement => {
  return <div className={`${isLoading ? 'flex' : 'hidden'} top-0 left-0 fixed w-screen h-screen items-center z-30`}>
    <div className='absolute z-30 bg-white opacity-60 w-screen h-screen top-0 left-0'/>
    <div className='m-auto flex gap-x-3 items-center z-40'>
      <div className='loader rounded-full w-2 h-2 bg-black'/>
      <div className='loader rounded-full w-2 h-2 bg-black'/>
      <div className='loader rounded-full w-2 h-2 bg-black'/>
      <div className='loader rounded-full w-2 h-2 bg-black'/>
      <div className='loader rounded-full w-2 h-2 bg-black'/>
    </div>
  </div>
}

export default Loading
