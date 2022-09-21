import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { sanityClient, urlFor } from '../../sanity';
import { CommentForm, Header, PostBody } from '../../components';
import { Post } from '../../typings';
import CommentList from '../../components/CommentList';

interface PostDetailsStaticProps {
  post: Post;
}

interface PostDetail extends PostDetailsStaticProps {}

const PostDetails: NextPage<PostDetail> = ({ post }) => {
  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />
      <PostBody post={post} />
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      <CommentForm post={post} />
      <CommentList comments={post.comments} />
    </main>
  );
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
        _id,
        slug {
            current
        }
      }
    `;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostDetailsStaticProps> = async ({
  params,
}) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        _createdAt,
        author -> {
          name,
          image
        },
        'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
        description,
        mainImage,
        slug,
        body
      }
    `;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
