import type { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const NotFound = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta
          name='description'
          content='Too bad, 404 error occured'
        />
      </Head>
      <main>
        <div className='h-screen flex justify-center items-center gap-x-3'>
          <h1 className='font-bold text-2xl'>404</h1>
          <span className='text-3xl'>|</span>
          <p className='text-xl font-medium'>
            Not Found, Back <Link
              href={'/'}
              className='text-sky-700 font-bold'
            >
              Home
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

export default NotFound
