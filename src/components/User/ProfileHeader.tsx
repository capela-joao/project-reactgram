import React from 'react';
import { User } from '@/types/UserTypes';

interface profileHeaderProps {
  profile: User;
}

const ProfileHeader = ({ profile }: profileHeaderProps) => {
  return (
    <div className="flex p-4 gap-12 w-full max-w-8/10 items-start">
      <div className="flex justify-center items-center p-8">
        {profile?.profileImage && (
          <img
            src={profile?.profileImage}
            alt={profile?.username}
            className="w-48 h-48 rounded-full bg-gray-50"
          />
        )}
        {!profile?.profileImage && (
          <div className="w-48 h-48 rounded-full bg-gray-50">
            <span>Escolha uma foto de perfil</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 self-start">
        <div className="flex gap-4 items-center">
          <h1 className="font-semibold text-lg text-gray-50">
            {profile?.username}
          </h1>
          <button className="bg-gray-800 rounded-md p-2 text-gray-50 font-semibold opacity-90 hover:opacity-100 cursor-pointer">
            Editar Perfil
          </button>
        </div>
        <div className="flex flex-col text-gray-50">
          <span>{profile?.firstName}</span>
          <span>{profile?.bio}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
