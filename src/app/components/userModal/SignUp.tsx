"use client";
import { useState } from "react";
import FirstStep from "../signUp/FirstStep";
import SecondStep from "../signUp/SecondStep";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema, { SignUpType } from "@/schemas/UserSignUp";

export default function SignUp() {
  const methods = useForm<SignUpType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthdate: new Date(),
      email: "",
      password: "",
      confirm: "",
    },
    mode: "all",
    resolver: zodResolver(SignUpSchema),
  });
  const { handleSubmit, formState: {errors} } = methods;
  //TODO: RETURN TO 0
  const [step, setStep] = useState(1);

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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

  methods.watch()

  return <FormProvider {...methods}>{renderStep(step)}</FormProvider>;
}
