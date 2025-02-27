import React from "react";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Админка</h1>
        <p className="text-gray-600">
          Добро пожаловать в панель администратора.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
