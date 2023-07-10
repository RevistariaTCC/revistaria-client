'use client'

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { funnelIcon } from "../../../../public/icons/Icons";
import FilterTemplate from "../../components/FilterTemplate";

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

    return(
        <div className="grid grid-cols-4 gap-2 mt-12 max-w-[1600px]">
            <div className="cell:col-span-4 md:col-span-1 md:h-screen flex md:justify-end">
                {pageSize.width > 759 ? (
                    <div className="border-2 p-4 cell:w-[100%] max-w-[280px] min-w-[205px] grid-rows-1">
                        <FilterTemplate title="Categoria">
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                        </FilterTemplate>

                        <FilterTemplate title="Editora">
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                        </FilterTemplate>

                        <FilterTemplate title="Ano de Edição">
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                            <h2>cat1</h2>
                        </FilterTemplate>
                    </div>
                ) : (
                    <div className="grid grid-cols-2">
                        <button className="w-6 flex">
                            <div>
                                {funnelIcon}
                            </div>
                            filtro
                        </button>
                    </div>
                )}
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
    
    )
};
 