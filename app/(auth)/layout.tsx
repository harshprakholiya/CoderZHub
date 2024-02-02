import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen bg-auth-light bg-no-repeat dark:bg-auth-dark">
      {children}
    </div>
  );
};

export default Layout;
