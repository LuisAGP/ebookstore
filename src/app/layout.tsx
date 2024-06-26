import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: "Stories ebook store",
  description: "Found a great storie to read right now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
