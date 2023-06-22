export default function Home() {
    return(
        <div className="grid grid-cols-12 h-screen">

            <div className="col-span-6 bg-[#4C5A77] flex justify-center items-center">
                <div className="flex justify-center">
                    image
                </div>
            </div>

            <div className="col-span-6 flex justify-center items-center">
                <div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
