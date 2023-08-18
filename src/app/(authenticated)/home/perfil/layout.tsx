'use client'

import { useEffect, useState } from "react";
import SidebarPerfil from "../../components/SidebarPerfil"
import { sandwichIcon } from "../../../../../public/icons/Icons";
import Drawer from "../../components/Drawer";

type LayoutProps =  {
    children: React.ReactNode
}


export default function layout({children} : LayoutProps) {

    const [pageSize, setPageSize] = useState({ width: 0});
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        const updatePageSize = () => {
          const width = window.innerWidth || 0;
          setPageSize({ width });
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updatePageSize);
            updatePageSize(); 
        }
  
        return () => {
            if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updatePageSize);
            }
        };
    }, []);

    return (
        <div className="mx-[5%] cell:mt-10 md:mt-20 flex justify-center">

            {!isClicked && pageSize.width <= 771 ? 
                (
                    <button className="fixed top-3 left-2" onClick={()=> isClicked ? setIsClicked(false) : setIsClicked(true) }>
                        {sandwichIcon}
                    </button>

                ) : (

                    <aside className="md:static">
                        <SidebarPerfil closeDrower={() => setIsClicked(true)}/>
                    </aside>
                )         
            }

            {isClicked && pageSize.width <= 771 ? 
                (
                    <Drawer Onclick={()=> setIsClicked(false)}>
                        <SidebarPerfil closeDrower={() => setIsClicked(false)}/>    
                    </Drawer>
                ) :
                    null
                }

            {children}
        </div>
    )
};
