"use client";
import { useRouter } from "next/navigation";
import { listCollections } from "@/services/api/internal/collection";
import { useQuery } from "react-query";
import CollectionScrollCards from "../CollectionScrollCards";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import SkeletonLoading from "./SkeletonLoading";

type CollectionType = {
  collectionGroupId: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
};

const ListCollections = () => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<CollectionType[]>(
    listCollections()
  );

  const handleClick = (id: string) => {
    router.push(`/collection-detail/${id}`);
  };

  return (
    <div className="mt-16 mx-2">
      <h2 className="flex items-center">
        Coleções <ArrowRightIcon />
      </h2>
      {isLoading && (
        <SkeletonLoading
          quantity={6}
          width={171}
          height={224}
          skeletonName="collections"
        />
      )}
      {data && <CollectionScrollCards items={data} onClick={handleClick} />}
    </div>
  );
};

export default ListCollections;
