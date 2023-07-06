import { downIcon } from "../../../public/icons/Icons";



export default function Navbar() {
    return(
        <div className="grid grid-cols-2 h-12 items-center px-[10%] bg-[#4C5A77] text-yellow-500">
            <div className="">Logo</div>
            <button className="flex justify-end" data-dropdown-toggle="dropdown"  type="button" id="dropdownButton">
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">M</div>
            </button>
        </div>
    )
};
