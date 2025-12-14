import React from 'react';

const Dashboard = () => {
  return (
    <div className="w-full flex justify-center px-24">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        {/* Feed */}
        <div className="flex flex-col items-center gap-4 p-8 text-gray-50">
          <h1 className="text-3xl font-bold">Feed</h1>
        </div>

        {/* Profile */}
        <div className="flex flex-col gap-4 py-8 pl-8 text-gray-50">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
