import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
  openGraph: {
    title: "Sign In",
    description: "Sign in to your account",
    images: "https://www.clerk.dev/images/social.png"
  },

};

export default function Page() {
  return <SignIn />;
}
