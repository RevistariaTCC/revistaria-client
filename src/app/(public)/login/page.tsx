'use client'

import Image from "next/image"
import Logo from "../../../../public/images/logo.png"
import GoogleImage from "../../../../public/icons/google-Icon.png"
import { useRouter } from "next/navigation"
import Input from "@/app/components/Input"
import Link from "next/link"

export default function Home() {
    const router = useRouter()

    return(
        <div className="grid grid-cols-3 h-screen grid-rows-4">

            <div className="bg-[#4C5A77] grid md:grid-rows-3  cell:col-span-3 md:col-span-1 xm:col-span-2 cell:row-span-1 md:row-span-4">
                <div></div>

                <div className="grid justify-center items-center p-4 min-w-[100px]">
                    <Image src={Logo} alt="" className="cell:mb-0 xs:mb-6 md:w-96 cell:w-72"/>
                    <div className="grid justify-end">
                        <div className="md:text-xl xm:text-2xl font-bold text-white">A Banca de revistas</div>
                        <div className="cell:text-xl text-end md:text-3xl xm:text-5xl font-bold text-[#edd416]">MODERNA</div>
                    </div>
                </div>
                
                <div></div>
            </div>

            <div className="flex justify-center cell:pt-[10%] md:pt-0 md:items-center xm:mx-1 cell:col-span-3 md:col-span-2 xm:col-span-1 cell:row-span-3 md:row-span-4 bg-gray-100">
                <div className="flex flex-col justify-center items-center px-5 py-5 min-w-[260px] max-w-[350px] max-h-[350px]">
                    <div className="cell:mb-8 md:mb-16 cell:text-2xl md:text-3xl text-yellow-500 font-bold">
                        Login
                    </div>
                    <form className="grid grid-cols-1 justify-center px-[5%]" onSubmit={() => router.push('/home')}>
                        <Input Label="Usuário" InputType="text" InputId="username" InputPlaceholder="ze.silva"></Input>
                        <Input Label="Senha" InputType="password" InputId="senha" InputPlaceholder="***********"/>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mr-2 mt-6 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                        <div className="text-center text-sm mt-6">Ou entre com:</div>
                        <button className="flex justify-center items-center bg-white hover:bg-blue-300 rounded-md mt-2 h-9 transition-all">
                            <Image src={GoogleImage} width={25} height={25} alt="Login com google"/>
                        </button>
                        <div className="flex flex-col mt-4 ">
                            <Link href='/recuperar-senha' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">                          
                                Esqueceu a senha?
                            </Link>
                            <Link href='/cadastro' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Cadastre-se</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
