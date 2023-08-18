import Input from "@/app/components/Input";
import Link from "next/link";


export default function Perfil() {

    return (
        <div className="flex flex-col md:w-[880px]">
            <div className="mb-20 h-7 text-xl ps-3 bg-gray-300">Perfil</div>
            <div className="cell:w-full md:w-1/2">
                <form action="">
                    <div className="border rounded-md p-2">
                        <div className="mb-4">Conta</div>
                        <Input Label="Nome" InputPlaceholder="nome do usuario" InputId="nome" InputType="text"></Input>
                        <Input Label="Email" InputPlaceholder="email do usuario" InputId="email" InputType="email"></Input>
                    </div>
                    <div className="mt-12 border rounded-md p-2">
                        <div className="mb-4">Mudar Senha</div>
                        <Input Label="Senha atual" InputPlaceholder="**************" InputId="senha" InputType="password"></Input>
                        <Input Label="Nova senha" InputPlaceholder="**************" InputId="senha" InputType="password"></Input>
                    </div>
                    <div className="mt-12 border rounded-md p-2">
                        <div className="mb-4">Notificações</div>
                        <div className="bg-white grid grid-cols-2 py-2 mb-2 rounded-md items-center text-sm text-gray-700 font-bold">
                            Me notificar sobre novidades
                            <div className="grid justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" id="favorite-toggle"/>
                                    <div className={ `w-11 h-6 bg-gray-200 outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 `}></div>
                                </label>
                            </div> 
                        </div> 
                        <div className="bg-white grid grid-cols-2 py-2 mb-2 rounded-md items-center text-sm text-gray-700 font-bold">
                            Me notificar sobre meus Interesses 
                            <div className="grid justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" id="favorite-toggle"/>
                                    <div className={ `w-11 h-6 bg-gray-200 outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 `}></div>
                                </label>
                            </div>
                            <div className="col-span-2">
                                <hr className="my-2"/>
                                <Link href='/home/perfil/interesses' className="hover:text-[#000000]">
                                    Alterar Interesses
                                </Link>
                            </div>
                        </div>                        
                    </div>
                    <div className="my-12">
                        <button className="p-2 bg-yellow-400 rounded-md hover:bg-yellow-500">Salvar Mudanças</button>
                    </div>
                </form>

            </div>
        </div>
    )
};
