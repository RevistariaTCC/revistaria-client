import React, { useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import VolumeModal from "./VolumeModal";

type CarrouselProps = {
  volume: volumeList[];
}

type volumeList = {
  id: number;
  title: string;
  category: string[];
  image: string;
  status: 'AVAILABLE' | 'UNAVAILABLE';
};


export default function ScrollCards(props : CarrouselProps) {

  const [showModal,setShowModal] = useState(false);
  
  const cards = props.volume;
  const [volumesName, setVolumesName] = useState("");

  const DISPONIBILITY = {
    AVAILABLE: {text: 'Disponivel', class: 'bg-green-400'},
    UNAVAILABLE: {text: 'Indisponivel', class: 'bg-gray-300'}
  }

  const handleClick = (volumesName: string) =>{
    setShowModal(true);
    setVolumesName(volumesName);
  }

  return (
    <div className="flex overflow-x-auto scrollbar">
      {/* <div className="flex" onWheel={handleWheel} >
        <button className="flex-none z-10 border-none bg-transparent rounded" onClick={showPrev}>
          <ArrowBackIos/>
        </button>  
        <button className="flex-none z-10 border-none bg-transparent rounded" onClick={showNext}>
          <ArrowForwardIos/>
        </button>
      </div> */}
        <div className={`gap-2 z-0 flex p-2`}>
          {cards.map((volume) => (
              <Card key={volume.id} className='w-[130px] p-2 flex flex-col justify-center hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer'>
                  <CardActionArea onClick={()=>handleClick(volume.title)} className='p-0 m-0 h-full'>
                      <CardContent sx={{maxWidth: '100%', padding:'0'}}>
                          <CardMedia
                              component='img'
                              image={volume.image}
                              height={200}  
                              className='my-1 max-w-full rounded'
                          /> 
                          <div className={`flex justify-center items-center rounded h-S8 ${DISPONIBILITY[volume.status].class}`}>
                            <h4>{DISPONIBILITY[volume.status].text}</h4>
                          </div>
                      </CardContent>
                  </CardActionArea>
              </Card> 
            ))}
        </div>
      <VolumeModal openModal={showModal} volumesName={volumesName} handleClose={()=>setShowModal(false)}/>
    </div>
    )
};
