import React from 'react';
import Link from 'next/link';
import { Input } from './input';
import { Button } from './button';

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-gray-950 text-gray-50 flex justify-between px-6">
      <div className="flex items-center font-bold text-xl">
        <Link href="/">ReactGram</Link>
      </div>
      <div className="flex flex-1 items-center px-6 justify-center">
        <Input type="text" placeholder="Pesquise..." className="max-w-sm" />
      </div>
      <div className="flex gap-4 px-6 items-center">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="default">Register</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
