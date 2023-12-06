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
import { Alert, AlertColor, LinearProgress, Snackbar } from "@mui/material";
import { useAuth } from "../../../hooks/auth";
import SecondStep from "../signUp/SecondStep";

interface AlertType {
  type: AlertColor | undefined;
  message: string;
}

interface ExceptionResponse {
  type: string;
  error: Response;
}

export default function SignUp() {
  const methods = useForm<SignUpType>({
    defaultValues: {
      name: "",
      phone: "",
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
  const [step, setStep] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
    type: undefined,
    message: "",
  });

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      const { data:user, token } = data;
      signIn({ token, user });
    },
    onError: ({ error }: ExceptionResponse) => {
      error.text().then((text) => {
        setAlert({ type: "error", message: JSON.parse(text).message });
        setShowAlert(true);
      });
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    createUserMutation.mutate({...data, cpf: data.cpf.replaceAll(/[^0-9]+/g, '')});
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
      <Snackbar
        className="fixed"
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
