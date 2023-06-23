export default function Home() {
    return(
        <div className="grid grid-cols-2 h-screen grid-rows-4">

            <div className="bg-[#4C5A77] flex justify-center items-center cell:col-span-2 md:col-span-1 cell:row-span-1 md:row-span-4">
                <div className="flex justify-center">
                    image
                </div>
            </div>

            <div className="flex justify-center items-center border cell:col-span-2 md:col-span-1 cell:row-span-3 md:row-span-4">
                <div>
                <form className="bg-gray-200 shadow-md rounded-ss-[90px] rounded-ee-[90px] px-16 py-10 mb-4">
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
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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
