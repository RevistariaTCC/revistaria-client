"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { listCollections } from "@/services/api/internal/collection";
import CollectionCard from "./CollectionCard";
import SkeletonLoading from "./SkeletonLoading";

interface iCollection {
  name: string;
  id: string;
  image: string;
  categories: iCategory[];
  volumes: iVolumes[];
}

interface iVolumes {
  id: number;
  title: string;
  category: string[];
  image: string;
  status: "AVAILABLE" | "UNAVAILABLE";
}

interface iCategory {
  id: string;
  name: string;
}

const NewCollectionsCarousel = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(listCollections());

  const handleClickColections = (id: string) => {
    router.push(`/collection-detail/${id}`);
  };

  return (
    <div className="flex gap-2 cell:justify-center md:justify-normal flex-wrap">
      {isLoading && (
        <SkeletonLoading
          quantity={5}
          width={220}
          height={414}
          skeletonName="news-collections"
        />
      )}
      {data &&
        data
          .slice(0, 5)
          .map((collection: iCollection) => (
            <CollectionCard
              collection={collection}
              onClick={(id) => handleClickColections(id)}
              key={`new-collection-${collection.id}`}
            />
          ))}
    </div>
  );
};

export default NewCollectionsCarousel;
