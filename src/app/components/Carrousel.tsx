import React, { useState } from "react";
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material/';
import { List } from "postcss/lib/list";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Modal, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import VolumeModal from "./VolumeModal";

type CarrouselProps = {
  volume: volumeList[]
}

type volumeList = {
  id: number;
  volumeName: string;
  category: string[];
  img: string;
};


export default function Carrousel(props : CarrouselProps) {

  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  const [wheelTimeout, setWheelTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showModal,setShowModal] = useState(false);
  
  const cards = props.volume;
  const [volumesName, setVolumesName] = useState("");

  const showNext = () => {
    setIsTransitioning(true);
    setIsReversing(false);
    setTimeout(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
      setIsTransitioning(false);
    }, 500);
  };

  const showPrev = () => {
    setIsTransitioning(true);
    setIsReversing(true);
    setTimeout(()=> {
      setStartIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
      setIsTransitioning(false);
    }, 500)
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isTransitioning) {
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
    setWheelTimeout(
      setTimeout(() => {
        if (event.deltaX > 0) {
          showNext();
        } else if (event.deltaX < 0) {
          showPrev();
        }
      }, 100)
    );
  };

  const handleClick = (volumesName: string) =>{
    setShowModal(true);
    setVolumesName(volumesName);
  }
  
  const handleArray = () =>{
    const total = startIndex + 4 - cards.length;
    return total>0 ? cards.slice(startIndex, startIndex + 4).concat(cards.slice(0, total)): cards.slice(startIndex, startIndex + 4);
  }

  return (
    <div className="">
      <div className="flex" onWheel={handleWheel} >
        <button className="flex-none z-10 border-none bg-gray-200 hover:bg-gray-300 opacity-70 rounded" onClick={showPrev}>
          <ArrowBackIos/>
        </button>
        <div className={`overflow-x-auto gap-2 grow z-0 carousel ${isTransitioning ? (isReversing ? 'rotate-exit-active' : 'rotate-enter-active'): ''}`}>
          {handleArray().map((volume, index) => (
              <div key={volume.id} className=" bg-gray-400 rounded flex justify-center items-center">
                <Card className='w-[130px] p-2 flex flex-col justify-center hover:shadow-md hover:shadow-blue-300 hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer'>
                    <CardActionArea onClick={()=>handleClick(volume.volumeName)} className='p-0 m-0 h-full'>
                        <CardContent sx={{maxWidth: '100%', padding:'0'}}>
                            <CardMedia
                                component='img'
                                image={volume.img}
                                height={200}
                                className='my-1 max-w-full'
                            /> 
                            <div className="flex justify-center items-center bg-gray-300 rounded h-8">
                              <h4>{volume.volumeName}</h4>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
              </div>
            ))}
        </div>
        <button className="flex-none z-10 border-none bg-gray-200 hover:bg-gray-300 opacity-70 rounded" onClick={showNext}>
          <ArrowForwardIos/>
        </button>
      </div>
      <VolumeModal openModal={showModal} volumesName={volumesName} handleClose={()=>setShowModal(false)}/>
    </div>
    )
};
