'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import Sidebar from '@/components/ui/sidebar';
import NewPost from '@/components/posts/NewPost';
import { Logout } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [openNewPost, setOpenNewPost] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(Logout());
    router.push('/login');
  };

  return (
    <div className="flex bg-gray-950">
      <Sidebar onNewPost={() => setOpenNewPost(true)} onLogout={handleLogout} />
      <NewPost open={openNewPost} onOpenChange={setOpenNewPost} />
      {children}
    </div>
  );
}
