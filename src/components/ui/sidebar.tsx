'use client';

import React from 'react';
import { House, Search, User, Cog, Plus } from 'lucide-react';
import { Button } from './button';

import { getProfile } from '@/store/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

import { API_URL } from '@/config/env';

interface SidebarProps {
  onLogout?: () => void;
  onNewPost?: () => void;
}

const Sidebar = ({ onLogout, onNewPost }: SidebarProps) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && !loading) {
      dispatch(getProfile());
    }
  }, [user, loading, dispatch]);

  return (
    <aside className="h-screen flex flex-col p-4 pt-8 w-72 border-r border-gray-800 text-gray-50">
      <div className="mb-10">
        <h1 className="text-3xl font-bold px-2">ReactGram</h1>
      </div>
      <div className="flex flex-col gap-4 px-2 flex-1 mb-10">
        <a
          href="/dashboard"
          className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950"
        >
          <House />
          Dashboard
        </a>
        <a
          href="/dashboard"
          className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950"
        >
          <Search />
          Search
        </a>
        <button
          onClick={onNewPost}
          className="block bg-transparent flex gap-2 py-3 px-2 cursor-pointer rounded-md hover:bg-gray-50 hover:text-gray-950"
        >
          <Plus />
          <span>New Post</span>
        </button>
        <a
          href="/dashboard"
          className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950"
        >
          <Cog />
          Settings
        </a>
        {!user && (
          <a
            href="/dashboard"
            className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950"
          >
            <User />
            Profile
          </a>
        )}
        {user && (
          <a
            href="/profile"
            className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950 flex items-center"
          >
            <img
              src={`${API_URL}/uploads/users/${user.profileImage}`}
              alt={user.username}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{user.username}</span>
          </a>
        )}
      </div>
      <div className="mb-10">
        <Button
          onClick={onLogout}
          variant={'destructive'}
          className="w-full block cursor-pointer h-12 font-semibold text-lg"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
