'use cliente';

import React from 'react';
import { House, Search, User, Cog } from 'lucide-react';
import { Button } from './button';

const Sidebar = () => {
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
          Pesquisa
        </a>
        <a
          href="/dashboard"
          className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950"
        >
          <User />
          Profile
        </a>
        <a
          href="/dashboard"
          className="block flex gap-2 py-3 px-2 rounded-md hover:bg-gray-50 hover:text-gray-950"
        >
          <Cog />
          Settings
        </a>
      </div>
      <div className="mb-10">
        <Button
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
