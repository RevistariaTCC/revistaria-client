import "../styles/globals.css";
import { Metadata } from "next";
import MainLayout from "./components/MainLayout";

<link rel="icon" href="/favicon.ico" sizes="12x12" />

export const metadata: Metadata = {
  title: 'Revistaria',
  icons: {
    icon: '/images/favicon.png',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
