import FavoriteCard from "./components/FavoriteCard";

export default function Favoritos() {
    return(
        <div className="grid justify-center cell:mt-10 xm:mt-20">
            <div className="mb-20 text-2xl text-center bg-gray-300">Lista de interesses</div>
            <div className="grid cell:grid-cols-2 xm:grid-cols-3 lg:grid-cols-4 gap-2 justify-center"> 
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
                <FavoriteCard></FavoriteCard>
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
