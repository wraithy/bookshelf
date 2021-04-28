import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/bookshelf/favicon.ico' />
          <link rel='apple-touch-icon' href='/bookshelf/apple-touch-icon.png' />

          <meta name='description' content='An alternate UI for goodreads data' />
          <meta name='theme-color' content='#E5E5E5' />
        </Head>
        <body className='bg-base-1'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
