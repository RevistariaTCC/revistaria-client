'use client'

import { useEffect, useRef, useState } from "react"
import { logOffIcon, userIcon } from "../../../../public/icons/Icons"
import Link from "next/link"

export default function DropDownMenu() {
    
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    function menuTemplate(styles?: string) {
        return(
            <div className={`cell absolute bg-[#4C5A77] cell:right-[6%] md:right-[9%] top-12 ${styles} rounded-b-md px-2 text-[#4C5A77] font-bold text-sm shadow-md`}>
                <Link href='/home/perfil' className="bg-white grid grid-cols-2 py-2 px-4 mb-2 rounded-md items-center hover:bg-[#f3f3f3]">
                    Perfil
                    <div className="grid justify-center">
                        {userIcon}
                    </div>
                </Link>
                <div className="">
                    <div className="flex justify-center bg-white py-2 px-4 mb-2 rounded-md items-center hover:bg-[#f3f3f3] hover:text-blue-950">
                        Sair
                        <div className="grid justify-center">
                            {logOffIcon}
                        </div> 

                    </div>
                </div> 
            </div>
        )
    }

    return(
        <div ref={dropdownRef}>
            <button className="flex justify-end" data-dropdown-toggle="dropdown"  type="button" id="dropdownButton" onClick={() => toggleDropdown()}>
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">P</div>
            </button>
            {isOpen ? (
                menuTemplate('translate-y-0')
            ) : (
                menuTemplate('-translate-y-80')
            )}
        </div>

    )    
};
