import { Skeleton } from "@mui/material";

interface SkeletonLoadingProps {
  quantity: number;
  skeletonName: string;
  width: number;
  height: number;
}

const SkeletonLoading = ({quantity, skeletonName, width, height}: SkeletonLoadingProps) => {


  const skeletonsArray = Array.from({ length: quantity }, (_, index) => index);

  return(<div className="flex gap-5">
    {skeletonsArray.map(index => <Skeleton animation="wave" key={`${skeletonName}-${index}`} variant="rounded"  width={width} height={height}></Skeleton>)}
    
  </div>)

}

export default SkeletonLoading;