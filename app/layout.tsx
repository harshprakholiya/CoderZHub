import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import React from 'react';
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/themeProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'CoderZHub',
  description:
    'CoderZHub is a community of developers for asking and answering programming questions. We are a community of like-minded people who want to learn, create, and grow together.',
  icons: [
    
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} custom-scrollbar`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'text-primary-gradient hover:text-primary-600',
            },
          }}
        >
          <ThemeProvider> {children} </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
