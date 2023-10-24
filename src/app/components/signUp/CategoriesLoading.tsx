import { Skeleton } from "@mui/material";

export default function CategoriesLoading(){
  
  return <>
    Loading...
    <div className="flex row gap-4 flex-wrap">
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
      <Skeleton variant="rounded" width={210} height={40} animation="wave"/>
    </div>
    
  </>
}