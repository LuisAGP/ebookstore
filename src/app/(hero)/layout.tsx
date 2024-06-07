import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
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
    <main className="bg-image">
        <Navbar filled={false} />
        {children}
    </main>
  );
}
