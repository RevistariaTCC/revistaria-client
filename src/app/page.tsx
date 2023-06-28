import Image from "next/image"
import Logo from "../../public/images/logo.png"

export default function Home() {
    return(
        <div className="grid grid-cols-3 h-screen grid-rows-4">

            <div className="bg-[#4C5A77] grid md:grid-rows-3  cell:col-span-3 md:col-span-2 cell:row-span-1 md:row-span-4">
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

            <div className="flex justify-center cell:mt-[10%] md:mt-0 md:items-center cell:col-span-3 md:col-span-1 cell:row-span-3 md:row-span-4">
                <div> 
                <form className="bg-gray-200 shadow-md rounded-ss-[90px] rounded-ee-[90px] cell:px-10 md:px-16 py-10 mb-4 border border-yellow-500 grid grid-cols-1">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Usuário
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ze.silva"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Senha
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline" type="button">
                            Login
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Esqueceu a senha?
                        </a>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
