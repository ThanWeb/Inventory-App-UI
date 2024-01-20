import type { ReactElement } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'
import { type IStateMessage } from '@/store/message/action'
import { type IStateUser } from '@/store/user/action'

interface IDefaultLayoutProps {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

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
      <header className={inter.className}>
        <p>{user !== null ? user.username : 'Guest'}</p>
      </header>
      <main className={inter.className}>
        {children}
      </main>
      <div className={inter.className}>
        <p>{message?.text}</p>
        <p>{isLoading ? 'Sabar Lagi Loading' : 'Udah Gak Loading'}</p>
      </div>
      <footer className={inter.className}>
        Ini Footer
      </footer>
    </>
  )
}

export default DefaultLayout
