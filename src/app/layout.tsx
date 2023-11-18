'use client'
import "../styles/globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/Navbar";
import { AuthProvider } from "@/hooks/auth";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Container } from "@mui/material";
import { GitHub } from "@mui/icons-material";

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
            
            <footer className="mt-16 flex bg-[#121212] w-full justify-center">
              <Container className="text-white grid md:grid-cols-3 justify-center justify-items-center">
                  <div>
                    <h3>LINKS UTEIS</h3>
                    <p><GitHub className="fill-white"/> Github</p>
                    <p><GitHub className="fill-white"/> Github</p>
                    <p><GitHub className="fill-white"/> Github</p>
                  </div>
                  <div>
                    <h3>DESENVOLVEDORES</h3>
                    <p>Alan P.</p>
                    <p>Luan Lima</p>
                    <p>Samuel Meira</p>
                  </div>
                  <div>
                    <h3>CONTATO</h3>
                    <p>email alan</p>
                    <p>email luan</p>
                    <p>email samuel</p>
                  </div>
                  <div>© 2023 Copyright: revistaria.com</div>
              </Container>
            </footer>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
