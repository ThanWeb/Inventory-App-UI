import { useEffect, type ReactElement, useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import { type RootState } from '@/store'
import { unsetMessageActionCreator, type IStateMessage, setMessageActionCreator } from '@/store/message/action'
import { type IStateUser, asyncUnsetAuthUser, setUserActionCreator } from '@/store/user/action'
import { setLoadingFalseActionCreator, setLoadingTrueActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

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

  const [isNavShowed, setIsNavShowed] = useState(false)
  const [isDropdownShowed, setIsDropdownShowed] = useState(false)

  useEffect(() => {
    void init()
  }, [dispatch])

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        dispatch(unsetMessageActionCreator())
      }, 2000)
    }
  }, [message])

  const init = async (): Promise<void> => {
    dispatch(setLoadingTrueActionCreator())
    const response: { error: boolean, message: string, user: IStateUser } = await api.verifyToken()

    if (response.error) {
      dispatch(setMessageActionCreator({ error: response.error, text: response.message }))

      setTimeout(() => {
        void router.push('/sign-in')
      }, 3000)
    } else {
      dispatch(setUserActionCreator(response.user))
    }

    dispatch(setLoadingFalseActionCreator())
  }

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
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
        <link
          rel='icon'
          href='/favicon/favicon.ico'
          sizes='any'
        />
        <link
          rel='apple-touch-icon'
          href='/favicon/apple-touch-icon.png'
          type='image/png'
          sizes='any'
        />
      </Head>
      <Header
        props={{
          user,
          handleLogout,
          isNavShowed,
          setIsNavShowed,
          isDropdownShowed,
          setIsDropdownShowed
        }}
      />
      <main className={inter.className}>
        {children}
      </main>
      <div className={inter.className}>
        <Loading isLoading={isLoading} />
      </div>
      {/* <footer className={inter.className}>
        Ini Footer
      </footer> */}
    </>
  )
}

export default DefaultLayout
