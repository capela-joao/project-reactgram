import React from 'react';
import { cookies } from 'next/headers';
import { User } from '@/types/UserTypes';
import { API_BASE_URL } from '@/lib/api';
import ProfileHeader from '@/components/User/ProfileHeader';

const Profile = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  if (!token) {
    return <p className="text-gray-50">Não autenticado!</p>;
  }

  const profileRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const profile: User = await profileRes.json();

  return (
    <div className="flex flex-col items-center w-full">
      {/*Profile Header*/}
      <ProfileHeader profile={profile} />
      {/*Profile Posts*/}
    </div>
  );
};

export default Profile;
