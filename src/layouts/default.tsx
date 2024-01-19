import type { ReactElement } from 'react'
import Head from 'next/head'

interface IDefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: IDefaultLayoutProps): ReactElement => {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' type='image/png' sizes='any' />
      </Head>
      <main>
        {children}
      </main>
      <div>
        Ini Untuk Loading dan Message
      </div>
    </>
  )
}

export default DefaultLayout
