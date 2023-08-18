import FavoriteCard from "@/app/(authenticated)/components/FavoriteCard";

export default function Interesses() {
    return(
        <div className="flex flex-col ">
            <div className="mb-20 h-7 text-xl ps-3 bg-gray-300">Interesses</div>
            <div className="grid cell:grid-cols-2 xm:grid-cols-3 lg:grid-cols-4 gap-2 justify-center"> 
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
            </div>
        </div>
    )  
};
