"use client";
import { listVolumes } from "@/services/api/internal/volume";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useQuery } from "react-query";
import IndexScrollCards from "./IndexScrollCards";
import SkeletonLoading from "./SkeletonLoading";

type Volume = {
  id: string;
  title: string;
  category: string[];
  image: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  synopsis: string;
};

const ListVolumes = () => {
  const { data, isLoading } = useQuery<Volume[]>({ ...listVolumes() });

  return (
    <div className="mt-16">
      <h2 className="flex items-center">
        Tudo <ArrowRightIcon />
      </h2>
      {isLoading && (
        <SkeletonLoading
          quantity={6}
          width={167}
          height={274}
          skeletonName="volumes"
        />
      )}
      {data && <IndexScrollCards volumes={data}></IndexScrollCards>}
    </div>
  );
};

export default ListVolumes;
