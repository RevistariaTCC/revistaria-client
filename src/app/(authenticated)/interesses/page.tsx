'use client'

import Link from "next/link";
import InterestCard from "./components/InterestCard";
import { useState } from "react";


export default function Interesses() {

    const [selected, setSelected] = useState<number[]>([])
    
    interface Categoria {
      id: number;
      nome: string;
    }
    
    const categorias: Categoria[] = [
      { id: 1, nome: 'Ação' },
      { id: 2, nome: 'Auto Ajuda' },
      { id: 3, nome: 'Ficção' },
      { id: 4, nome: 'Anime' },
      { id: 5, nome: 'HQ' },
      { id: 6, nome: 'Revistas' },
      { id: 7, nome: 'Culinária' },
      { id: 8, nome: 'Colecionaveis' },
      
      ];

      const handleItemClick = (id: number) => {
        if (selected.includes(id)) {
          setSelected(selected.filter((categoryId) => categoryId !== id));
        } else {
          setSelected([...selected, id]);
        }
      }; 

    return(
        <div className="flex flex-col justify-center items-center cell:mt-16 md:mt-32 cell:mx-4 md:mx-32 ">
            <div className="text-center text-2xl font-bold text-[#333f57] mb-10">
                Selecione seus interesses!
            </div>
            <div className="mb-5 text-green-600">
              {selected.length === 0 ? 
                (
                  <div>
                    Minímo 3
                  </div>
                ) : (
                  selected.length
                )
              }
            </div>
            <div className="flex flex-wrap justify-center gap-1 max-w-[950px] max-h-[500px] overflow-y-auto pt-2 scrollbar">
                {categorias.map((category) =>
                    <div key={category.id}>
                        <InterestCard OnClick={()=> handleItemClick(category.id)} styles={`${selected.includes(category.id)? 'bg-gray-200 border-[#4C5A77]' : 'bg-white'}`}>
                          {category.nome}
                        </InterestCard>
                    </div> 
                )}
            </div>
            {selected.length >= 3 ? 
              (              
                <div className="cell:mt-8 md:mt-5">
                    <Link href='/home' className="py-2 px-2 rounded-md bg-green-500 hover:bg-green-600 hover:text-white">Próximo</Link>
                </div>
              ) : (
                null
              )
            }
        </div>
    )
};
