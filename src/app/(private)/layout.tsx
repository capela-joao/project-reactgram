'use client';

import { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import NewPost from '@/components/posts/NewPost';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [openNewPost, setOpenNewPost] = useState(false);

  return (
    <div className="flex bg-gray-950">
      <Sidebar onNewPost={() => setOpenNewPost(true)} />
      <NewPost open={openNewPost} onOpenChange={setOpenNewPost} />
      {children}
    </div>
  );
}
