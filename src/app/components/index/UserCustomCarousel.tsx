"use client";
import { useAuth } from "@/hooks/auth";
import { getHome } from "@/services/api/internal/user";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useQuery } from "react-query";
import CollectionScrollCards from "../CollectionScrollCards";
import { useRouter } from "next/navigation";

interface iData {
  favorites: CollectionType[];
  suggestions: CollectionType[];
}

type CollectionType = {
  collectionGroupId: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
};

const UserCustomCarousel = () => {
  const { token } = useAuth();

  if (!token) return <></>;

  const { data, isLoading, isError } = useQuery<iData>(
    getHome({ headers: { Authorization: `Bearer ${token}` } })
  );

  const router = useRouter();

  if (!data) return <></>;

  const { favorites, suggestions } = data;

  const handleClick = (id: string) => {
    router.push(`/collection-detail/${id}`);
  };

  return (
    <div>
      {suggestions.length > 0 && (
        <div className="mt-16">
          <h2 className="flex items-center">
            Sugestões <ArrowRightIcon />
          </h2>
          <CollectionScrollCards items={suggestions} onClick={handleClick} />
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-16">
          <h2 className="flex items-center">
            Favoritos <ArrowRightIcon />
          </h2>
          <CollectionScrollCards items={favorites} onClick={handleClick} />
        </div>
      )}
    </div>
  );
};

export default UserCustomCarousel;
