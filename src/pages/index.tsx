import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { createUrqlClient } from '../utils/createUrqlClient'

function Home() {
  return (
    <div>
      <Head>
        <title>Community Fridge Finder</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
      </Head>
      <h1>Hello World</h1>
    </div>
  )
};

export default withUrqlClient(createUrqlClient)(Home)
