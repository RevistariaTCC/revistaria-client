import { useState } from "react";
import FirstStepNewPass from "../newPasswordSteps/firstStepNewPass";
import SecondStep from "../signUp/SecondStep";


export default function newPassword() {

    const [showAlert, setShowAlert] = useState(false);
    const [step, setStep] = useState(0);

    const renderStep = (step: number) => {
        switch (step) {
          case 0:
            return <FirstStepNewPass next={() => setStep(1)}></FirstStepNewPass>;
    
          case 1:
            return (
              <SecondStep
                next={() => setStep(2)}
                previous={() => setStep(0)}
              ></SecondStep>
            );
          case 2:
            return (
              <>
              </>
            );
        }
      };
};
