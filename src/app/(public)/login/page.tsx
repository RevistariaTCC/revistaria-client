'use client'

import Image from "next/image"
import Logo from "../../../../public/images/logo.png"
import { useRouter } from "next/navigation"
import Input from "@/app/components/Input"
import Link from "next/link"

export default function Home() {
    const router = useRouter()

    return(
        <div className="grid grid-cols-3 h-screen grid-rows-4">

            <div className="bg-[#4C5A77] grid md:grid-rows-3  cell:col-span-3 md:col-span-1 xm:col-span-2 cell:row-span-1 md:row-span-4">
                <div></div>

                <div className="grid justify-center p-4 min-w-[100px]">
                    <Image src={Logo} alt="" className="cell:mb-0 xs:mb-6 md:w-96 cell:w-72"></Image>
                    <div className="grid justify-end">
                        <div className=" text-2xl font-bold text-white">A Banca de revistas</div>
                        <div className="cell:text-2xl text-end md:text-5xl font-bold text-[#edd416] ">MODERNA</div>
                    </div>
                </div>
                
                <div></div>
            </div>

            <div className="flex justify-center cell:mt-[10%] md:mt-0 md:items-center xm:mx-1 cell:col-span-3 md:col-span-2 xm:col-span-1 cell:row-span-3 md:row-span-4">
                <div className="w-[70%] min-w-[260px] max-w-[350px]">
                    <form className="grid grid-cols-1 justify-center bg-gray-200 shadow-md rounded-ss-[90px] rounded-ee-[90px] py-16 mb-4 border border-yellow-500" onSubmit={() => router.push('/home')}>
                        <Input Label="Usuário" InputType="text" InputId="username" InputPlaceholder="ze.silva"></Input>
                        <Input Label="Senha" InputType="password" InputId="senha" InputPlaceholder="***********"/>
                        <div className="flex items-center justify-between">
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>
                            <div className="flex flex-col">
                                <Link href='' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">                          
                                    Esqueceu a senha?
                                </Link>
                                <Link href='/cadastro' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Cadastre-se</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
