import React from 'react';

export const CommentForm: React.FC = () => {
  return (
    <form className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />
      <label className="form-label">
        <span>Name</span>
        <input
          className="form-input-custom form-input"
          placeholder="John Doe"
          type="text"
        />
      </label>
      <label className="form-label">
        <span>Email</span>
        <input
          className="form-input-custom form-input"
          placeholder="your@email.com"
          type="email"
        />
      </label>
      <label className="form-label">
        <span>Comment</span>
        <textarea
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="Enter your comment here"
          rows={8}
        />
      </label>
    </form>
  );
};
