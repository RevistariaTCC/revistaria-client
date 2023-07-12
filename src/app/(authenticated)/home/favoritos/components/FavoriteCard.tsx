import { favoriteIcon, xIcon } from "../../../../../../public/icons/Icons"

type FavoriteCardProps = {
    imageUrl?: URL
}


export default function FavoriteCard({imageUrl} : FavoriteCardProps) {
    return(
        <div className="h-[250px]">
            <div className="cell:w-[165px] cell:h-[135px] md:w-[195px] md:h-[155px] lg:w-[214px] lg:h-[174px] border border-black rounded-md"></div>
            <div className="grid grid-cols-2 mx-5 mt-5">
                <div className="text-lg">
                    Título
                </div>
                <div className="grid justify-end">
                    <button className="">
                        {xIcon}
                    </button>
                </div>
            </div>
        </div>
    )
};
