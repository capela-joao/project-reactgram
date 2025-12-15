'use client';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getProfile } from '@/store/features/authSlice';
import { useEffect } from 'react';

const Profile = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && !loading) {
      dispatch(getProfile());
    }
  }, [user, loading, dispatch]);
  return (
    <div className="flex justify-center w-full items-center">
      <h1 className="font-bold text-3xl text-gray-50">Olá, {user?.username}</h1>
    </div>
  );
};

export default Profile;
