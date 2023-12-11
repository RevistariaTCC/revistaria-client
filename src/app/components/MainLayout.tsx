'use client'
import "../../styles/globals.css";
import { Inter } from "next/font/google";
import NavBar from "./Navbar";
import { AuthProvider } from "@/hooks/auth";
import { QueryClient, QueryClientProvider } from 'react-query'
import Footer from "./Footer";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function MainLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {

    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#D6D6D6]`}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                    <NavBar />
                    <div className="m-2">
                        {children}
                    </div>
                    <Footer/>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
};
