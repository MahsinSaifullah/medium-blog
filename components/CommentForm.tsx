import * as React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CommentFormInput, Post } from '../typings';

interface CommentFormProps {
  post: Post;
}

export const CommentForm: React.FC<CommentFormProps> = ({ post }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInput>();

  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    try {
      await axios.post('/api/comment', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('---error', error);
      setIsSubmitted(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold">
          Thank for submitting your comment!
        </h3>
        <p>Once it has been approved, it will appear below!</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />
      <input {...register('_id')} type="hidden" name="_id" value={post._id} />
      <label className="form-label">
        <span>Name</span>
        <input
          {...register('name', { required: true })}
          name="name"
          className="form-input-custom form-input"
          placeholder="John Doe"
          type="text"
        />
      </label>
      <label className="form-label">
        <span>Email</span>
        <input
          {...register('email', { required: true })}
          name="email"
          className="form-input-custom form-input"
          placeholder="your@email.com"
          type="email"
        />
      </label>
      <label className="form-label">
        <span>Comment</span>
        <textarea
          {...register('comment', { required: true })}
          name="comment"
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="Enter your comment here"
          rows={8}
        />
      </label>
      <div className="flex flex-col p-5">
        {errors.name && (
          <span className="text-red-500">The name field is required</span>
        )}
        {errors.email && (
          <span className="text-red-500">The email field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500">The comment field is required</span>
        )}
      </div>
      <input
        type="submit"
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none
         text-white font-bold py-2 px-4 rounded cursor-pointer"
      />
    </form>
  );
};
