import { useState } from "react";
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material/';

type CarrouselProps = {
  title: string
}

export default function Carrousel(props : CarrouselProps) {

  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  const [wheelTimeout, setWheelTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const cards = [1,2,3,4,5,3,123,4,1,23,5,32,5,12,6,1];

  
  const showNext = () => {
    setIsTransitioning(true);
    setIsReversing(false);
    setTimeout(() => {
      setStartIndex((prevIndex) => (prevIndex + 4) % cards.length);
      setIsTransitioning(false);
    }, 500);
  };

  const showPrev = () => {
    setIsTransitioning(true);
    setIsReversing(true);
    setTimeout(()=> {
      setStartIndex((prevIndex) => (prevIndex - 4 + cards.length) % cards.length);
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
  

  return (
    <div className="">
      <h2>{props.title}</h2>
      <div className="flex" onWheel={handleWheel} >
        <button className="flex-none z-10 border-none bg-gray-200 hover:bg-gray-300 opacity-70 rounded" onClick={showPrev}>
          <ArrowBackIos/>
        </button>
        <div className={`overflow-x-auto gap-2 grow z-0 carousel ${isTransitioning ? (isReversing ? 'rotate-exit-active' : 'rotate-enter-active'): ''}`}>
            {cards.slice(startIndex, startIndex + 4).map((element, index) => (
              <div key={element} className="h-40 w-60 bg-gray-400 rounded flex justify-center items-center">
                {element}
              </div>
            ))}
        </div>
        <button className="flex-none z-10 border-none bg-gray-200 hover:bg-gray-300 opacity-70 rounded" onClick={showNext}>
          <ArrowForwardIos/>
        </button>
      </div>

    </div>
    )
};
