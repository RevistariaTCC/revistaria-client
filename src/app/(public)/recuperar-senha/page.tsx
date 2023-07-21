'use client'

import Image from "next/image"
import Logo from "../../../../public/images/logo.png"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Form from "@/app/components/Input"

export default function Home() {
    const router = useRouter()

    return(
        <div className="grid grid-cols-3 h-screen grid-rows-4">

            <div className="bg-[#4C5A77] grid md:grid-rows-3 cell:col-span-3 md:col-span-1 cell:row-span-1 md:row-span-4">
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

            <div className="flex justify-center cell:pt-[10%] md:pt-0 md:items-center cell:col-span-3 md:col-span-2 cell:row-span-3 md:row-span-4 bg-gray-100">
                <div className="flex flex-col">
                    <div className="cell:mb-6 md:mb-16 text-yellow-500 text-2xl font-bold text-center">
                        Recuperar senha
                    </div>
                    <form className=" grid grid-cols-1" onSubmit={() => router.push('/home')}>
                        <Form Label="Digite seu e-mail" InputType="email" InputId="email" InputPlaceholder="ze.silva@email.com"/>
                        <div className="flex items-center justify-between cell:mt-6 md:mt-10">
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Recuperar
                            </button>
                            <Link href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                                já possui conta?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
