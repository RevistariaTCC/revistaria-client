'use client'

import { useState } from "react"
import { favoriteIcon, logOffIcon } from "../../../../public/icons/Icons"
import Link from "next/link"

export default function DropDownMenu() {
    const [dropdown, setdropdown] = useState(false)
    const [news, setnews] = useState(true)

    function openClose(){
        if (dropdown === false) {
            setdropdown(true)
        } else {
            setdropdown(false)
        }
    }

    function trueOrFalse() {
        if (news === false) {
            setnews(true)
        } else {
            setnews(false)
        }
    } 
 
    function menuTemplate(styles?: string) {
        return(
            <div className={`cell md:w-64 absolute bg-[#4C5A77] right-[6%] top-12 ${styles} rounded-b-md px-2 text-[#4C5A77] font-bold text-sm shadow-md`}>
                <Link href='/home/favoritos' className="bg-white grid grid-cols-2 py-2 px-4 mb-2 rounded-md items-center hover:bg-[#f3f3f3]">
                    Favoritos
                    <div className="grid justify-center">
                        {favoriteIcon}
                    </div>
                </Link>
                <div className="bg-white grid grid-cols-2 py-2 px-4 mb-2 rounded-md items-center hover:bg-[#f3f3f3]">
                    Novidades
                    <div className="grid justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" id="favorite-toggle"/>
                            <div className={ `w-11 h-6 bg-gray-200 outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 `}></div>
                        </label>
                    </div> 
                </div> 
                <div className="bg-white grid grid-cols-2 py-2 px-4 mb-2 rounded-md items-center hover:bg-[#f3f3f3]">
                    Interesses 
                    <div className="grid justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" id="favorite-toggle"/>
                            <div className={ `w-11 h-6 bg-gray-200 outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 `}></div>
                        </label>
                    </div>
                    <div className="col-span-2">
                        <hr className="my-2"/>
                        <Link href='/home/meus-interesses' className="hover:text-[#141630]">
                            Alterar Interesses
                        </Link>
                    </div>
                </div>
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
        <>
            <button className="flex justify-end" data-dropdown-toggle="dropdown"  type="button" id="dropdownButton" onClick={() => openClose()}>
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">P</div>
            </button>
            {dropdown === true ? (
                menuTemplate('translate-y-0')
            ) : (
                menuTemplate('-translate-y-80')
            )}
        </>

    )    
};
