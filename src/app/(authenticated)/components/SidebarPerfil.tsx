'use client'

import { useRouter } from "next/navigation";
import { handthumbup, starIcon, userIcon } from "../../../../public/icons/Icons";

type SidebarPerfilProps = {
    closeDrower : () => void
}

export default function SidebarPerfil({closeDrower} : SidebarPerfilProps) {

    const router = useRouter()

    return(
        <div className="md:w-52 me-7 h-[100vh] md:border rounded-md px-3 py-3">
            <ul className="grid grid-rows-1">
                <li className="flex py-3 ps-2 cursor-pointer" onClick={() => {router.push('/home/perfil'); closeDrower()}}> 
                    {userIcon}
                    <div className="ps-1">
                        Perfil
                    </div>
                </li>
                <hr />
                <li className="flex py-3 ps-2 cursor-pointer" onClick={()=> {router.push('/home/perfil/favoritos'), closeDrower()}}> 
                    {starIcon}
                    <div className="ps-1">
                        Favoritos
                    </div>
                </li>
                <hr />
                <li className="flex py-3 ps-2 cursor-pointer" onClick={()=> {router.push('/home/perfil/interesses'), closeDrower()}}> 
                    {handthumbup}
                    <div className="ps-1">
                        interesses
                    </div>
                </li>        
            </ul>
        </div>
    )
};
