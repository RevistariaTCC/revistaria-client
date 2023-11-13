'use client'
import "../styles/globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/Navbar";
import { AuthProvider } from "@/hooks/auth";
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavBar />
            <div className="m-2">
              {children}
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
