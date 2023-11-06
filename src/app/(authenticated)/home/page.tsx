'use client'

import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import { funnelIcon } from "../../../../public/icons/Icons";
import FilterTemplate from "../components/FilterTemplate";
import Drawer  from "../components/Drawer";

export default function Home() {
    /*
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

    return(
        <div>
            {isClicked && pageSize.width <= 770 ? 
                <Drawer Onclick={() => {setIsClicked(false)}} children={<FilterTemplate/>}/> : null
            }
            <div className="grid cell:justify-center md:justify-normal pt-8">
                <div className="grid grid-cols-4 gap-2 max-w-[1600px]">
                    <div className="cell:col-span-4 md:col-span-1 md:h-screen flex md:justify-end">
                        {pageSize.width > 771 ? (
                            <div className="p-4 cell:w-[100%] max-w-[280px] min-w-[205px] ">
                                <FilterTemplate/>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2">
                                <button className="w-6 flex" onClick={() => isClicked ? setIsClicked(false) : setIsClicked(true) }>
                                    <div>
                                        {funnelIcon}
                                    </div>
                                    filtro
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="cell:col-span-4 md:col-span-3 h-52 grid cell:justify-start xm:justify-center md:pt-5">
                        <div className="grid cell:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 cell:gap-2 md:gap-3">
                            <HomeCard/>
                            <HomeCard/>
                            <HomeCard/>
                            <HomeCard/>
                            <HomeCard/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
    )
    */

    return (
        <div className="mx-10">
            <div className="flex h-full w-full border border-black">

                
            </div>
        </div>
    )
};
 