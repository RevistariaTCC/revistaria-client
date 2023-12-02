"use client";
import React, { useState } from "react";
import FirstStep from "../signUp/FirstStep";
import ThirdStep from "../signUp/ThirdStep";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema, { SignUpType } from "@/schemas/UserSignUp";
import StepperComponent from "../signUp/Stepper";
import { useMutation } from "react-query";
import { createUser } from "@/services/api/internal/user";
import { LinearProgress } from "@mui/material";
import { useAuth } from "../../../hooks/auth";
import SecondStep from "../signUp/SecondStep";

export default function SignUp() {
  const methods = useForm<SignUpType>({
    defaultValues: {
      name: "",
      phone: "(41) 99570-5692",
      birthdate: new Date(),
      password: "",
      confirm: "",
      newsletter: true,
    },
    mode: "all",
    resolver: zodResolver(SignUpSchema),
  });
  const { signIn } = useAuth();
  const { handleSubmit } = methods;
  const [step, setStep] = useState(1);
  const createUserMutation = useMutation(createUser, {
    onSuccess: (data, variables, context) => {
      const { result, token } = data;
      signIn({ token, user: result });
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    createUserMutation.mutate(data);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <FirstStep next={() => setStep(1)}></FirstStep>;

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
            {createUserMutation.isLoading && <LinearProgress />}
            <ThirdStep
              previous={() => setStep(1)}
              handleSubmit={handleSubmit(onSubmit)}
            ></ThirdStep>
          </>
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
