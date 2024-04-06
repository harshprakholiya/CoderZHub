import React from 'react';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CoderZHub | Sign up",
  description: "Sign up to your account",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen bg-auth-light bg-cover dark:bg-auth-dark">
      {children}
    </div>
  );
};

export default Layout;
