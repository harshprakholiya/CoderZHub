import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen bg-auth-light bg-cover dark:bg-auth-dark">
      {children}
    </div>
  );
};

export default Layout;
