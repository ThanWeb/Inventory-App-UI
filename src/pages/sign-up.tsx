import { useState, type ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import AuthPageLayout from '@/layouts/auth'
import AuthForm from '@/components/AuthForm'
import Message from '@/components/Message'
import { type RootState } from '@/store'
import { type IStateMessage, setMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

export default function SignUp (): ReactElement {
  const dispatch = useDispatch()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const message: IStateMessage | null = useSelector((state: RootState) => state.message)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (username.length < 5) {
      dispatch(setMessageActionCreator({ error: true, text: 'Nama Akun Minimal 5 Karakter' }))
      return
    }

    if (password.length < 8) {
      dispatch(setMessageActionCreator({ error: true, text: 'Kata Sandi Minimal 8 Karakter' }))
      return
    }

    dispatch(setLoadingTrueActionCreator())
    const { error, message } = await api.register({ username, password })
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
        <title>Sign Up | Inventory App</title>
        <meta name='description' content='Sign Up'/>
      </Head>
      <div className='m-auto p-8 w-full md:w-8/12 lg:w-4/12 flex flex-col gap-y-6'>
        <h1 className='text-2xl font-bold'>Daftar</h1>
        <div>
          <AuthForm
            props={{
              isLoginPage: false,
              username,
              setUsername,
              password,
              setPassword,
              showPassword,
              togglePasswordVisibility,
              onSubmitHandler
            }}
          />
        </div>
        <div className='flex justify-end gap-x-1'>
          <p>Sudah Mendaftar?</p>
          <p>Silahkan <Link href='/sign-in' className='font-bold text-blue-950'>Masuk</Link></p>
        </div>
        <Message message={message} />
      </div>
    </>
  )
}

SignUp.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}
