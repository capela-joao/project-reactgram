'use client';
import { Post } from '@/types/PostsTypes';
import { Heart, MessageCircle } from 'lucide-react';
import { API_UPLOADS_URL } from '@/config/env';
import TimeAgo from '../ux/timeago';

interface PostCardProps {
  posts: Post[];
}

const PostCard = ({ posts }: PostCardProps) => {
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="w-full aspect-square mb-4">
            <div className="flex gap-2 items-center py-4">
              <img
                src={`${API_UPLOADS_URL}/users/${post.user.profileImage}`}
                alt={post.user.username}
                className="w-8 h-8 rounded-full"
              />
              <h2 className="font-semibold">{post.user.username}</h2>
              <span className="text-gray-500">•</span>
              <TimeAgo date={post.createdAt} />
            </div>
            <img
              src={`${API_UPLOADS_URL}/photos/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover  overflow-hidden rounded-md"
            />
            <ul className="flex gap-4 p-2">
              <li>
                <Heart className="cursor-pointer" />
              </li>
              <li>
                <MessageCircle className="cursor-pointer" />
              </li>
            </ul>
            <h2 className="py-2 flex gap-1">
              <span className="font-semibold">{post.user.username}</span>
              <span>{post.title}</span>
            </h2>
          </div>
        ))}
    </div>
  );
};

export default PostCard;
