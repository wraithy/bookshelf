import Head from 'next/head'
import '../styles/font.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
