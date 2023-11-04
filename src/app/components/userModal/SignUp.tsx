"use client";
import React, { useState } from "react";
import FirstStep from "../signUp/FirstStep";
import SecondStep from "../signUp/SecondStep";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema, { SignUpType } from "@/schemas/UserSignUp";
import StepperComponent from "../signUp/Stepper";

export default function SignUp() {
  const methods = useForm<SignUpType>({
    defaultValues: {
      name: "",
      phone: "",
      birthdate: new Date(),
      email: "",
      password: "",
      confirm: "",
      newsletter: true,
    },
    mode: "all",
    resolver: zodResolver(SignUpSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const [step, setStep] = useState(0);

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
  };


  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <FirstStep next={() => setStep(1)}></FirstStep>;
      case 1:
        return (
          <SecondStep
            previous={() => setStep(0)}
            handleSubmit={handleSubmit(onSubmit)}
          ></SecondStep>
        );
    }
  };

  methods.watch();

  return (
    <FormProvider {...methods}>
      <StepperComponent step={step} />
      {renderStep(step)}
    </FormProvider>
  );
}
