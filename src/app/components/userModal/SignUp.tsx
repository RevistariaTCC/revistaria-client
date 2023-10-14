"use client";
import { useState } from "react";
import FirstStep from "../signUp/FirstStep";
import SecondStep from "../signUp/SecondStep";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema, { SignUpProps } from "@/schemas/UserSignUp";

export default function SignUp() {
  const methods = useForm<SignUpProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: undefined,
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
  });
  const { handleSubmit } = methods;
  const [step, setStep] = useState(0);

  const onSubmit: SubmitHandler<SignUpProps> = (data) => {
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
            handleSubmit={() => handleSubmit(onSubmit)}
          ></SecondStep>
        );
    }
  };

  return <FormProvider {...methods}>{renderStep(step)}</FormProvider>;
}
