import "../styles/globals.css";
import { Metadata } from "next";
import MainLayout from "./components/MainLayout";


export const metadata: Metadata = {
  title: 'Revistaria',

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
