import { useState, type ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import AuthPageLayout from '@/layouts/auth'
import AuthForm from '@/components/AuthForm'
import { asyncSetUser } from '@/store/user/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import { setMessageActionCreator } from '@/store/message/action'

export default function SignIn (): ReactElement {
  const router = useRouter()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    const { error, message } = await dispatch(asyncSetUser({ username, password }))
    dispatch(setMessageActionCreator({ error, text: message }))

    if (!error) {
      setTimeout(() => {
        void router.push('/')
        dispatch(setLoadingFalseActionCreator())
      }, 3000)

      return
    }

    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Sign In | Inventory App</title>
        <meta name='description' content='Sign In'/>
      </Head>
      <div>
        <h1>Sign In</h1>
        <div>
          <AuthForm
            props={{
              isLoginPage: true,
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
        <div>
          <p>Belum Punya Akun? Silahkan <Link href='/sign-up'>Daftar</Link></p>
        </div>
      </div>
    </>
  )
}

SignIn.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}
