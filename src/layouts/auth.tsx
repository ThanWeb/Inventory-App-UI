import { useEffect, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { type RootState } from '@/store'
import { unsetMessageActionCreator, type IStateMessage } from '@/store/message/action'

interface IAuthPageLayoutProps {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

const AuthPageLayout = ({ children }: IAuthPageLayoutProps): ReactElement => {
  const dispatch = useDispatch()

  const message: IStateMessage | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        dispatch(unsetMessageActionCreator())
      }, 2000)
    }
  }, [message])

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' type='image/png' sizes='any' />
      </Head>
      <main className={inter.className}>
        {children}
      </main>
      <div className={inter.className}>
        <p>{message?.text}</p>
        <p>{isLoading ? 'Sabar Lagi Loading' : 'Udah Gak Loading'}</p>
      </div>
    </>
  )
}

export default AuthPageLayout
