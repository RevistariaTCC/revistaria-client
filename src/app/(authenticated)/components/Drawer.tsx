import { xIcon } from "../../../../public/icons/Icons"


type DrawerProps = {
    Onclick: () => void;
    children: React.ReactNode
}

export default function Drawer(props : DrawerProps) {
    return(
        <div className="fixed flex h-full w-full top-0 ">
            <div className="h-full flex-none w-64 bg-white">
                <div className="h-12 bg-[#4C5A77] text-yellow-500 font-bold border grid grid-cols-2 items-center px-7">
                    <div>
                        Filtros
                    </div>
                    <div className="flex justify-end  ">
                        <button className="" onClick={props.Onclick}>
                            {xIcon}
                        </button>
                    </div>
                </div>
                <div className="p-4 h-[calc(100vh-100px)] overflow-auto">
                    {props.children}
                </div>
                <div className="relative bottom-0 h-12 border-t flex justify-around items-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 w-24 h-7 rounded-sm flex justify-center items-center"> Limpar </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 w-24 h-7 rounded-sm flex justify-center items-center"> Aplicar </button>
                </div>
            </div>
            <div className="bg-[#1f1e1e75] h-full flex-1 float-right" onClick={props.Onclick}></div>
        </div>
    )
};
