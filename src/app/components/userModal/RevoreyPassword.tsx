import { useState } from "react";
import StepperComponent from "../newPasswordSteps/StepperNewPass";
import FirstStepNewPass from "../newPasswordSteps/FirstStepNewPass";
import SecondStep from "../newPasswordSteps/SecondStepNewPass";
import ThirdStepNewPass from "../newPasswordSteps/ThirdStepNewPass";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import RecoveryPasswordSchema, {
  RecoveryPasswordType,
} from "@/schemas/RecoveryPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/services/api/internal/user";
import { useMutation } from "react-query";
import { Alert, Snackbar } from "@mui/material";

interface RecoveryPasswordComponentProps {
  onUpdate(): void;
}

const RecoveryPasswordComponent = ({onUpdate}: RecoveryPasswordComponentProps) => {

  const [step, setStep] = useState(0);
  const methods = useForm<RecoveryPasswordType>({
    defaultValues: {
      cpf: "",
      password: "",
      confirm: "",
    },
    mode: "all",
    resolver: zodResolver(RecoveryPasswordSchema),
  });

  methods.watch();

  const { handleSubmit } = methods;

  const resetPasswordMutation = useMutation(resetPassword, {
    onSuccess: () => {onUpdate()},
  });

  const onSubmit: SubmitHandler<RecoveryPasswordType> = (data) => {
    resetPasswordMutation.mutate({
      cpf: data.cpf.replaceAll(/[^0-9]+/g, ""),
      newPassword: data.password,
    });
  };

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
            <ThirdStepNewPass
              previous={() => setStep(1)}
              handleSubmit={handleSubmit(onSubmit)}
            ></ThirdStepNewPass>
          </>
        );
    }
  };

  return (
    <FormProvider {...methods}>
      <StepperComponent step={step} />
      {renderStep(step)}
    </FormProvider>
  );
};

export default RecoveryPasswordComponent;
