import type { ReactElement } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'
import { type IStateMessage } from '@/store/message/action'
import { type IStateUser } from '@/store/user/action'

interface IDefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: IDefaultLayoutProps): ReactElement => {
  const user: IStateUser | null = useSelector((state: RootState) => state.user)
  const message: IStateMessage | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' type='image/png' sizes='any' />
      </Head>
      <header>
        <p>{user !== null ? user.username : 'Guest'}</p>
      </header>
      <main>
        {children}
      </main>
      <div>
        <p>{message?.text}</p>
        <p>{isLoading ? 'Sabar Lagi Loading' : 'Udah Gak Loading'}</p>
      </div>
    </>
  )
}

export default DefaultLayout
