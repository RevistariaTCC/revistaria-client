import { xIcon } from "../../../../public/icons/Icons"
import FilterTemplate from "../../components/FilterTemplate";


type FilterSideBarProps = {
    Onclick: () => void
}

export default function FilterSideBar(props : FilterSideBarProps) {
    return(
        <div className="fixed flex h-full w-full top-0">
            <div className="h-full flex-none w-64 bg-white">
                <div className="h-12 bg-[#4C5A77] text-yellow-500 font-bold border grid grid-cols-2 items-center px-7">
                    <div>
                        Filtros
                    </div>
                    <div className="flex justify-end">
                        <button onClick={props.Onclick}>
                            {xIcon}
                        </button>
                    </div>
                </div>
                <div className="p-4 border">
                    <div className="">
                        <FilterTemplate title="Categoria">
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                        </FilterTemplate>

                        <FilterTemplate title="Editora">
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                        </FilterTemplate>

                        <FilterTemplate title="Ano de Edição">
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                            <div className=""> <input type="checkbox" /> cat1</div>
                        </FilterTemplate>
                    </div>
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
