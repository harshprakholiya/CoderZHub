import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

  console.log(children)
  return (
    <main className="background-default_bg_primary50 relative">
      <Navbar />
      <div className="flex">
        left sidebar
        <section className="max-mb:pb-14 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 sm:px-14 ">

          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </section>

        right sidebar
      </div>

      Notifications
    </main>
  );
};

export default Layout;
