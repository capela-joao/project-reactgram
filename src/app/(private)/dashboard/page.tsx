import { cookies } from 'next/headers';
import { Post } from '@/types/PostsTypes';
import PostCard from '@/components/posts/PostCard';
import { Suspense } from 'react';

const Dashboard = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  if (!token) {
    return <p className="text-gray-50">Não autenticado!</p>;
  }

  const data = await fetch('http://localhost:5001/api/photos/', {
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!data.ok) {
    return <p className="text-gray-50">Erro ao carregar posts!</p>;
  }

  const posts: Post[] = await data.json();

  console.log(posts);
  return (
    <div className="w-full flex justify-center px-24">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        {/* Feed */}
        <div className="flex flex-col items-center gap-4 p-8 text-gray-50">
          <h1 className="text-3xl font-bold">Feed</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <PostCard posts={posts} />
          </Suspense>
        </div>
        {/* Profile */}
        <div className="flex flex-col gap-4 py-8 pl-8 text-gray-50">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
