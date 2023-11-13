import React, { useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import VolumeModal from "./VolumeModal";

type CarrouselProps = {
  volume: volumeList[];
}

type volumeList = {
  id: number;
  volumeName: string;
  category: string[];
  img: string;
};


export default function ScrollCards(props : CarrouselProps) {

  const [showModal,setShowModal] = useState(false);
  
  const cards = props.volume;
  const [volumesName, setVolumesName] = useState("");


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
        <div className={`gap-2 z-0 flex`}>
          {cards.map((volume) => (
              <Card key={volume.id} className='w-[130px] p-2 flex flex-col justify-center hover:-translate-y-2 transition ease-in-out duration-200 cursor-pointer'>
                  <CardActionArea onClick={()=>handleClick(volume.volumeName)} className='p-0 m-0 h-full'>
                      <CardContent sx={{maxWidth: '100%', padding:'0'}}>
                          <CardMedia
                              component='img'
                              image={volume.img}
                              height={200}  
                              className='my-1 max-w-full'
                          /> 
                          <div className="flex justify-center items-center bg-gray-300 rounded h-8">
                            <h4>Indisponivel</h4>
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
