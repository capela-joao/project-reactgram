import { User } from '@/types/UserTypes';
import React from 'react';

interface dashboardProfileProps {
  profile: User;
}

const DashboardProfile = ({ profile }: dashboardProfileProps) => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <img
          src={profile.profileImage}
          alt={profile.username}
          className="w-12 h-12 rounded-full"
        />
        <h1 className="font-semibold text-md">{profile.username}</h1>
      </div>
    </div>
  );
};

export default DashboardProfile;
