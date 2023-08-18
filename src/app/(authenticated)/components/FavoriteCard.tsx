import { xIcon } from "../../../../public/icons/Icons"

type FavoriteCardProps = {
    imageUrl?: URL
}


export default function FavoriteCard({imageUrl} : FavoriteCardProps) {
    return(
        <div className="h-[250px]">
            <div className="cell:w-[165px] cell:h-[135px] lg:w-[195px] lg:h-[155px] xl:w-[214px] xl:h-[174px] border rounded-md"></div>
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
