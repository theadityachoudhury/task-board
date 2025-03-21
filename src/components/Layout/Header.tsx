import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <div className="text-sm">
          Powered by AI
        </div>
      </div>
    </header>
  );
};