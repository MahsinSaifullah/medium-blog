import * as React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';

import { Banner, Header, PostItem } from '../components';
import { sanityClient } from '../sanity';
import { Post } from '../typings';

interface HomeServerSideProps {
  posts: Post[];
}
interface HomeProps extends HomeServerSideProps {}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<
  HomeServerSideProps
> = async () => {
  const query = `
    *[_type == "post"]{
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
