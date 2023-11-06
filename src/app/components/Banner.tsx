import { useEffect, useState } from "react";
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material/';
import Steps from './Steps'


export default function Banner() {

  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  
  const cards = [1,2,3,4,5];

  
  const showNext = () => {
    setIsTransitioning(true);
    setIsReversing(false);
    setTimeout(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
      setIsTransitioning(false);
    }, 500);
  };

    useEffect(() => {
        const intervalId = setInterval(showNext, 10000);
        return () => clearInterval(intervalId);
      }, []); 

  const showPrev = () => {
    setIsTransitioning(true);
    setIsReversing(true);
    setTimeout(()=> {
      setStartIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
      setIsTransitioning(false);
    }, 500)
  };

  return (
    <div className="">
      <div className="flex">
        <button className="flex-none z-10 border-none bg-gray-400" onClick={showPrev}>
          <ArrowBackIos/>
        </button>
        <div className={`overflow-x-auto gap-2 grow z-0 carousel ${isTransitioning ? (isReversing ? 'rotate-exit-active' : 'rotate-enter-active'): ''}`}>
            {cards.slice(startIndex, startIndex + 1).map((element, index) => (
              <div key={element} className="h-64 w-full bg-gray-400 flex justify-center items-center">
                {element}
              </div>
            ))}
        </div>
        <button className="flex-none z-10 border-none bg-gray-400" onClick={showNext}>
          <ArrowForwardIos/>
        </button>
        </div>
        <div className="flex justify-center">
            <Steps current={startIndex}></Steps>
        </div>
    </div>
    )
};
