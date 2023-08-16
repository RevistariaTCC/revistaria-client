'use client'

import { useRouter } from "next/navigation";
import ItemList from "./ItemList";
import { handthumbup, starIcon, userIcon } from "../../../../public/icons/Icons";



export default function SidebarPerfil() {

    const router = useRouter()

    return(
        <div className="w-52 me-7 h-[100vh]  border rounded-md px-3 py-3">
            <ul className="grid grid-rows-1">
                <ItemList pathRouter={()=> router.push('/home/perfil')} icon={userIcon} text={'Perfil'}/>             
                <ItemList pathRouter={()=> router.push('/home/perfil/favoritos')} icon={starIcon} text={'Favoritos'}/>
                <ItemList pathRouter={()=> router.push('/home/perfil/interesses')} icon={handthumbup} text={'Interesses'}/>
            </ul>
        </div>
    )
};
