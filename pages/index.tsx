import Head from 'next/head';
import type { NextPage } from 'next';

import { Header } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
