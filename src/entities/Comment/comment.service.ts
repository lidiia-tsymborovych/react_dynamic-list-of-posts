import { client } from '../../utils/fetchClient';
import { Post } from '../Post/Post';
import { Comment } from './Comment';

export const getComments = (postId: Post['id']) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: Comment['id']) => {
  return client.delete(`/comments/${commentId}`);
};
