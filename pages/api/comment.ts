import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

import { CommentFormInput } from '../../typings';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { _id, name, email, comment } = req.body as CommentFormInput;

      await client.create({
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: _id,
        },
        name,
        email,
        comment,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ status: 500, message: 'Could not submit comment', error });
    }

    return res
      .status(200)
      .json({
        status: 200,
        message: 'Comment submitted successfully',
        data: req.body,
      });
  }
};

export default handler;
