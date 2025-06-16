import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
// import { NewCommentForm } from './NewCommentForm';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';
import {
  deleteComment,
  getComments,
} from '../entities/Comment/comment.service';
import { ErrorMessage } from '../entities/Error';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

  useEffect(() => {
    if (post) {
      setErrorMessage(null);
      setLoading(true);
      getComments(post.id)
        .then(setComments)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [post]);

  const hasComments = comments && comments.length > 0;
  const noComments = comments && comments.length === 0;
  const readyToShow = !loading && comments !== null;

  const handleDeleteComment = (commentId: Comment['id']) => {
    deleteComment(commentId).then(() => {
      setComments(current =>
        current ? current.filter(comm => comm.id !== commentId) : null,
      );
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{post?.title}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {readyToShow && noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {readyToShow && hasComments && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {/* <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button> */}
      </div>

      {/* <NewCommentForm /> */}
    </div>
  );
};
