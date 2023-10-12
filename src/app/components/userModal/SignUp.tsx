'use client'
import { useState } from "react";
import FirstStep from "../signUp/FirstStep";
import SecondStep from "../signUp/SecondStep";

export default function SignUp(){
  const [step, setStep] = useState(0)

  switch (step){
    case 0: 
      return <FirstStep></FirstStep>
    case 1: 
      return <SecondStep></SecondStep>
  }
}