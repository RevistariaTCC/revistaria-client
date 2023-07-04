'use client'

import { useEffect, useState } from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function Home() {
    
    const [pageSize, setPageSize] = useState({ width: 0});

    useEffect(() => {
        const updatePageSize = () => {
          const width = window.innerWidth || 0;
          setPageSize({ width });
        };
    // Verificar se estamos no lado do cliente antes de adicionar o event listener
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updatePageSize);
            updatePageSize(); // Atualizar o tamanho da página inicialmente
        }
  
        return () => {
            if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updatePageSize);
            }
        };
    }, []);

    console.log(pageSize.width);

    return(
        <div>
            <Navbar/>
                <Layout>
                    <div className="grid grid-cols-4 gap-2 mt-12 max-w-[1600px]">
                        <div className="cell:col-span-4 md:col-span-1 md:h-screen grid md:justify-center">
                            <div className="bg-gray-300 p-8 cell:w-[100%] md:w-64 rounded-md">
                                teste
                            </div>
                        </div>
                        <div className="cell:col-span-4 md:col-span-3 h-52 md:mx-10">
                            <div className="grid cell:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cell:gap-1 md:gap-3">
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                            </div>
                        </div>
                    </div>
                </Layout>
        </div>
    )
};
 