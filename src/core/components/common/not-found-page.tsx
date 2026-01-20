import React from 'react';
import MainLayout from '../layout/main-layout';

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-6xl font-black text-(--text-main)">404</h1>
        <p className="mt-4 text-xl text-(--text-muted)">
          Oops! The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 font-semibold rounded-xl bg-(--primary-color) text-white transition-transform transform hover:scale-105 hover:brightness-110"
        >
          Go Back Home
        </a>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
