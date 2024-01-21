import { useEffect, type ReactElement } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@/store'
import { unsetMessageActionCreator, type IStateMessage, setMessageActionCreator } from '@/store/message/action'
import { type IStateUser, asyncUnsetAuthUser } from '@/store/user/action'
import { setLoadingFalseActionCreator, setLoadingTrueActionCreator } from '@/store/isLoading/action'

interface IDefaultLayoutProps {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

const DefaultLayout = ({ children }: IDefaultLayoutProps): ReactElement => {
  const router = useRouter()
  const dispatch = useDispatch()

  const user: IStateUser | null = useSelector((state: RootState) => state.user)
  const message: IStateMessage | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        dispatch(unsetMessageActionCreator())
      }, 2000)
    }
  }, [message])

  const handleLogout = async (): Promise<void> => {
    dispatch(setLoadingTrueActionCreator())
    const { error, message } = await dispatch(asyncUnsetAuthUser())
    dispatch(setMessageActionCreator({ error, text: message }))

    if (!error) {
      setTimeout(() => {
        void router.push('/sign-in')
        dispatch(setLoadingFalseActionCreator())
      }, 3000)

      return
    }

    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' type='image/png' sizes='any' />
      </Head>
      <header className={inter.className}>
        <p>{user !== null ? user.username : 'Guest'}</p>
        <button type='button' onClick={() => { void handleLogout() }}>Keluar</button>
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
