import { Suspense } from 'react';
import { cookies } from 'next/headers';

import PostCard from '@/components/posts/PostCard';
import DashboardProfile from '@/components/User/dashboardProfile';

import { Post } from '@/types/PostsTypes';
import { User } from '@/types/UserTypes';
import { API_URL } from '@/config/env';

const Dashboard = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  if (!token) {
    return <p className="text-gray-50">Não autenticado!</p>;
  }

  const [postRes, profileRes] = await Promise.all([
    fetch(`${API_URL}/api/photos/`, {
      headers: {
        Cookie: `token=${token}`,
      },
      credentials: 'include',
      cache: 'no-store',
    }),
    fetch(`${API_URL}/api/users/profile`, {
      headers: {
        Cookie: `token=${token}`,
      },
      credentials: 'include',
      cache: 'no-store',
    }),
  ]);

  if (!postRes.ok || !profileRes.ok) {
    return <p className="text-gray-50">Erro ao carregar posts!</p>;
  }

  const posts: Post[] = await postRes.json();
  const profile: User = await profileRes.json();

  return (
    <div className="w-full flex justify-center px-24">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        {/* Feed */}
        <div className="flex flex-col items-center gap-4 p-8 text-gray-50">
          <Suspense fallback={<div>Loading...</div>}>
            <PostCard posts={posts} />
          </Suspense>
        </div>
        {/* Profile */}
        <div className="flex flex-col gap-4 py-8 pl-8 text-gray-50">
          <DashboardProfile profile={profile} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
