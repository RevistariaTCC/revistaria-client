import { useState } from "react";
import {RadioButtonUnchecked, RadioButtonChecked} from '@mui/icons-material/';
type StepsProps = {
    current : number,
}

export default function Steps(props: StepsProps) {

  const [activeStep, setActiveStep] = useState(0);

  const steps = Array.from({length: 5}, (_, index) => index + 1);


  return (
    <div className="h-10 w-52 flex justify-center items-center">
        {steps.slice( 0 , steps.length).map((element, index) => (
            
            props.current === index ? (
                <RadioButtonChecked key={index} color="primary"/>
            ) : (
                <RadioButtonUnchecked key={index} color="primary"/>
            )
        ))}
        
    </div>
  );
}
